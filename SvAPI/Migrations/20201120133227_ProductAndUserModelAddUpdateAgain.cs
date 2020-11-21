using Microsoft.EntityFrameworkCore.Migrations;

namespace SvAPI.Migrations
{
    public partial class ProductAndUserModelAddUpdateAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UId",
                table: "ProductAndUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UId",
                table: "ProductAndUsers");
        }
    }
}
