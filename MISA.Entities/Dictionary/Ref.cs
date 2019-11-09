using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class Ref
    {
        public Guid RefID { get; set; }
        public string RefNo { get; set; }
        public string CustomerName { get; set; }
        public string OfficeName { get; set; }
        public string TaxCode { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string MemberCard { get; set; }
        public string LevelCard { get; set; }
        public decimal Debt { get; set; }
        public string Note { get; set; }
        public string Member5Food { get; set; }
        public string Status { get; set; }

        public string BirthDay { get; set; }
        public string Group { get; set; }

    }
}
