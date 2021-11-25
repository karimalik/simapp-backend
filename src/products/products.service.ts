import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  Products,
  ProductsDocuments,
  statusProduct,
} from './schemas/products.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private ProductsModel: Model<ProductsDocuments>,
  ) {}
  //add new data in the DB
  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Products> {
    const createdProducts = new this.ProductsModel();

    createdProducts.productId = uuidv4();
    createdProducts.name = createProductDto.name;
    createdProducts.codeBar = createProductDto.codeBar;
    createdProducts.dateDelivery = createProductDto.dateDelivery;
    createdProducts.dateExpired = createProductDto.dateExpired;
    createdProducts.disponibilite = createProductDto.disponibilite;
    createdProducts.description = createProductDto.description;
    createdProducts.image = createProductDto.image;
    createdProducts.quantite = createProductDto.quantite;
    createdProducts.video = createProductDto.video;
    createdProducts.status = statusProduct.PasEnPromotion;
    createdProducts.prixunitaire = createProductDto.prixunitaire;

    return createdProducts.save();
  }

  public async getAllProducts() {
    const findAll = this.ProductsModel.find().exec();

    return findAll;
  }

  public async getOneProduct(productId: string) {
    const findProduct = await this.ProductsModel.findOne({ productId });

    //if the products doesn't exit return error message else return the products
    if (!findProduct)
      throw new NotFoundException(
        `Products with the id ${productId} was not found`,
      );

    return findProduct;
  }

  public async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ) {
    const updateProduct = await this.getOneProduct(productId);

    if (updateProductDto.name) updateProduct.name = updateProductDto.name;
    if (updateProductDto.codeBar)
      updateProduct.codeBar = updateProductDto.codeBar;
    if (updateProductDto.dateDelivery)
      updateProduct.dateDelivery = updateProductDto.dateDelivery;
    if (updateProductDto.dateExpired)
      updateProduct.dateExpired = updateProductDto.dateExpired;
    if (updateProductDto.image) updateProduct.image = updateProductDto.image;
    if (updateProductDto.description)
      updateProduct.description = updateProductDto.description;
    if (updateProductDto.quantite)
      updateProduct.quantite = updateProductDto.quantite;
    if (updateProductDto.prixunitaire)
      updateProduct.prixunitaire = updateProductDto.prixunitaire;
    if (updateProductDto.video) updateProduct.video = updateProductDto.video;
    // if (updateProductDto.status) updateProduct.status = updateProductDto.status;

    return updateProduct.save();
  }

  public async removeProduct(productId: string) {
    const deleteProduct = await this.getOneProduct(productId);

    return deleteProduct.deleteOne();
  }

  // updateOne(productId: string, product: Products): Observable<any> {
  //   delete product.image;

  //   return from(this.ProductsModel.updateProduct(productId)).pipe(
  //     switchMap(() => this.getOneProduct(productId)),
  //   );
  // }
}
