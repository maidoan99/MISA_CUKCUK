using MISA.DL;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL
{
    public class RefBL
    {
        private RefDL _refDL = new RefDL();

        /**
         * Ham thuc hien chuc nang phan trang
         * nguoi tao: doan thi mai
         * ngya tao: 23/8/2019
         */
        public IEnumerable<Ref> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _employees = _refDL.GetData().OrderBy(p => p.RefNo)
                .Skip((_pageIndex - 1) * _pageSize)
                .Take(_pageSize);
            return _employees;
        }

    }
}
