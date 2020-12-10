using Microsoft.EntityFrameworkCore.Migrations;

namespace SvAPI.Migrations
{
    public partial class AddFavoritTableAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isFav",
                table: "Favorits",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isFav",
                table: "Favorits");
        }
    }
}
