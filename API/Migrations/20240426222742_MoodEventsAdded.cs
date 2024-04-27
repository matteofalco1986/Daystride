using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Daystride.Migrations
{
    /// <inheritdoc />
    public partial class MoodEventsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MoodEvents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MoodId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MoodEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MoodEvents_Moods",
                        column: x => x.MoodId,
                        principalTable: "Moods",
                        principalColumn: "Id");
                });
            migrationBuilder.CreateIndex(
                name: "IX_MoodEvents_MoodId",
                table: "MoodEvents",
                column: "MoodId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
