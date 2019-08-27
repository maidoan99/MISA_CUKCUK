using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    public class RefDL
    {
        private MISAWDT02DTMaiContext db = new MISAWDT02DTMaiContext();

        /**
         ham thuc hien lay danh sach khach hang
        nguoi tao: doan thi mai
        ngay tao: 21/8/2019
         */
        public IEnumerable<Ref> GetData()
        {
            return db.Refs;
        }

        /**
         * ham thuc hien xoa 1 khach hang
         * nguoi tao: doan thi mai
         * ngay tao: 21/8/2019
         */
         public void DeleteMultiple(List<Guid> refids)
        {
            foreach (var refid in refids)
            {
                var refitem = db.Refs.Where(p => p.RefID == refid).FirstOrDefault();
                db.Refs.Remove(refitem);
            }
            db.SaveChanges();
        }

        /**
         * Ham thuc hien them moi 1 khach hang
         * nguoi tao: doan thi mai
         * ngay tao: 21/8/2019
         */
        public void AddRef(Ref _ref)
        {
            _ref.RefID = Guid.NewGuid();
            db.Refs.Add(_ref);
            db.SaveChanges();
        }

        /**
         * Ham thuc hien sua thong tin cua khach hang
         * nguoi tao; doan thi mai
         * ngay tao: 4/8/2019
         */
        public void EditRef(Ref _ref)
        {
            var item = db.Refs.Where(p => p.RefID == _ref.RefID).FirstOrDefault();
            item.RefNo = _ref.RefNo;
            item.CustomerName = _ref.CustomerName;
            item.PhoneNumber = _ref.PhoneNumber;
            item.OfficeName = _ref.OfficeName;
            item.Address = _ref.Address;
            item.Email = _ref.Email;
            item.Note = _ref.Note;
            item.Status = _ref.Status;
            item.Member5Food = _ref.Member5Food;

            db.SaveChanges();
        }

        /**
         * Ham thuc hien lay khach hang co ID cho truoc
         * nguoi tao: doan thi mai
         * ngay tao: 24/8/2019
         */
         public Ref GetCusByID(string _refNo)
        {
            var cus = db.Refs.Where(p => p.RefNo == _refNo).FirstOrDefault();
            return cus;
        }
    }
}
