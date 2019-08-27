using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using MISA.BL;
using MISA.DL;
using MISA.Entities;
using MISA.WDT02.DTMai;
using MISA.WDT02.DTMai.Properties;

namespace MISA.WDT02.DTMai
{
    public class RefsController : ApiController
    {
        private RefDL _refDL = new RefDL();
        private RefBL _refBL = new RefBL();

        /**
         * ham thuc hien lay du lieu
         * nguoi tao: doan thi mai
         * ngay tao: 2/8/2019
         */
        [Route("refs")]
        [HttpGet]
        public AjaxResult GetRefs()
        {
            //return db.Refs;
            var _ajaxResult = new AjaxResult();

            try
            {
                _ajaxResult.Data = _refDL.GetData();
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;

            }
            return _ajaxResult;
        }

        /**
         * ham thuc hien xoa 1 khach hang
         * nguoi tao: doan thi mai
         * ngay tao: 3/8/2019
         */
        [Route("refs")]
        [HttpDelete]
        public AjaxResult DeleteRef([FromBody] List<Guid> refids)
        {
            var _ajaxResult = new AjaxResult();

            try
            {
                _refDL.DeleteMultiple(refids);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;

            }
            return _ajaxResult;
        }

        /**
         * Ham thuc hien them moi 1 khach hang
         * nguoi tao: doan thi mai
         * ngay tao: 22/8/2019
         */
        [Route("refs")]
        [HttpPost]
        public AjaxResult Post([FromBody] Ref _ref)
        {
            var _ajaxResult = new AjaxResult();

            try
            {
                _refDL.AddRef(_ref);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;

            }
            return _ajaxResult;
        }

        /**
         * Ham thuc hien sua thong tin khach hang
         * nguoi tao: doan thi mai
         * ngay tao: 4/8/2019
         */
        [Route("refs")]
        [HttpPut]
        public AjaxResult EditRefByRefID([FromBody] Ref _ref)
        {
            var _ajaxResult = new AjaxResult();

            try
            {
                _refDL.EditRef(_ref);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;

            }
            return _ajaxResult;
        }

        /**
         * Ham thuc hien chuc nang pha trang
         * nguoi tao: doan thi mai
         * ngya tao: 23/8/2019
         *
         */
        [Route("refs/{_pageIndex}/{_pageSize}")]
        [HttpGet]
        public async Task<AjaxResult> GetPagingData([FromUri] int _pageIndex, int _pageSize)
        {
            var _ajaxResult = new AjaxResult();

            try
            {
                _ajaxResult.Data = _refBL.GetPagingData(_pageIndex, _pageSize);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;

            }
            return _ajaxResult;
        }

        /***
         * Ham lay thong tin 1 khach hang voi id cho trc
         * nguoi tao: daon thi mai
         * ngay tao: 24/8/2019
         */
        [Route("refs/{_refNo}")]
        [HttpGet]
        public AjaxResult GetCusByRefNo(string _refNo)
        {
            var _ajaxResult = new AjaxResult();

            try
            {
                _ajaxResult.Data = _refDL.GetCusByID(_refNo);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = Resources.errorVN;
                _ajaxResult.Data = ex;

            }
            return _ajaxResult;
        }
    }
}