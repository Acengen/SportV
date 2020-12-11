﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace SvAPI.Migrations
{
    public partial class ProductTofav : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FavoriteId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_FavoriteId",
                table: "Products",
                column: "FavoriteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Favorites_FavoriteId",
                table: "Products",
                column: "FavoriteId",
                principalTable: "Favorites",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Favorites_FavoriteId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_FavoriteId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "FavoriteId",
                table: "Products");
        }
    }
}