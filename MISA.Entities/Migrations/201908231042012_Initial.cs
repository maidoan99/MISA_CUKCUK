namespace MISA.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Refs",
                c => new
                    {
                        RefID = c.Guid(nullable: false),
                        RefNo = c.String(),
                        CustomerName = c.String(),
                        OfficeName = c.String(),
                        TaxCode = c.String(),
                        Address = c.String(),
                        PhoneNumber = c.String(),
                        Email = c.String(),
                        MemberCard = c.String(),
                        LevelCard = c.String(),
                        Debt = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Note = c.String(),
                        Member5Food = c.String(),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.RefID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Refs");
        }
    }
}
