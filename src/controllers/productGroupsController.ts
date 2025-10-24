import { Request, Response } from "express";
import { getResponseObject } from "../utils/requestPayload";
import { productGroupsRequest } from "../types/productGroups";
import { ProductGroup } from "../model/productGroup";

export const createProductGroup = async (req: Request, res: Response) => {
  try {
    const payload = getResponseObject<productGroupsRequest>(req.body, [
      "title",
      "slug",
      "image",
      "groupType",
      "productIds",
    ]);

    const productGroup = new ProductGroup(payload);
    const response = await productGroup.save();
    res.status(201).json({
      status: 200,
      message: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductsGroups = async (req: Request, res: Response) => {
  try {
    const { type, page, perpage } = req.query;
    let limit = perpage ? parseInt(perpage as string) : null;
    let skip = page && limit ? (parseInt(page as string) - 1) * limit : null;
    const match = type ? { groupType: type } : {};

    //base pipeline
    const dataPipeline: any[] = [
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "productIds",
          as: "existingProducts",
        },
      },
    ];

    //pagination pipeline
    if (perpage && page) {
      dataPipeline.push({
        $skip: skip,
      });
      dataPipeline.push({
        $limit: limit,
      });
    }

    //project pipeline
    dataPipeline.push({
      $project: {
        id: "$_id",
        _id: 0,
        title: 1,
        slug: 1,
        image: 1,
        groupType: 1,
        productCount: { $size: "$existingProducts" },
      },
    });

    //FUll aggregation
    const productGroups = await ProductGroup.aggregate([
      {
        $match: match,
      },
      {
        $facet: {
          data: dataPipeline,
          total: [
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          data: 1,
          total: { $arrayElemAt: ["$total.count", 0] },
        },
      },
    ]);

    res.status(200).json({
      status: true,
      message: "success",
      data: productGroups[0].data || [],
      total: productGroups[0].total || 0,
    });
  } catch (error) {
    console.log(error);
  }
};
