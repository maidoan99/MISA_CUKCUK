$(document).ready(function () {
    var ref = new Ref();
    
});

class Ref extends Base {
    constructor() {
        super();
        this.InitEventsRef();
        this.RowOnClick();
        this.ValidateInput();
        this.ShortCutMethod();
        this.SetStatusButtonPaging(this);
    }

    InitEventsRef() {        
        $('.toolbar').on('click', 'button.delete', this.ClickOnDelete.bind(this));
        $(document).on('click', this.SetStatusButton);
        $('.main-table tbody').on('click', 'tr .Member5Food', { 'jsObject': this }, this.TickCheckBox);
        $('.main-table tbody').on('click', 'tr .Status', { 'jsObject': this } ,this.TickCheckBox);
        $('.toolbar').on('click', 'button.reload', this.ReloadData.bind(this));
        $(document).on('click', '.date-picker', this.OpenDatepicker);
        $('.toolbar').on('click', 'button.add-new', this.OpenDialogAdd.bind(this));
        $('#dialog.add-customer').on('click', 'button.save', { 'jsObject': this },  this.AddNewCustomer);
        $('#dialog.add-customer').on('click', 'button.save-add', this.AddNewCustomerAgain.bind(this));
        $('#dialog.add-customer').on('click', 'button.cancel', this.CloseDialogAdd.bind(this));
        $('.toolbar').on('click', 'button.edit', { 'jsObject': this }, this.OpenDialogEdit.bind(this));
        $('#dialog.edit-customer').on('click', 'button.save', this.EditCustomer.bind(this));
        $('#dialog.edit-customer').on('click', 'button.save-add', this.EditCustomerAgain.bind(this));
        $('#dialog.edit-customer').on('click', 'button.cancel', this.CloseDialogEdit.bind(this));
        $('.toolbar').on('click', 'button.duplicate', this.OpenDialogDublicate.bind(this));
        $('.table-th').on('click', '.filter-select', { 'jsObject': this }, this.ShowFilterType);
        $(document).on('keyup', '#_pageIndex', this.PagingTable.bind(this));
        $(document).on('change', '#_pageSize', this.LoadDataByPageSize.bind(this));

        $('#dialog-warning-add-change').on('click', 'button.yes', function () {
            $('#dialog-warning-add-change').dialog('close');
        });
        $('#dialog-warning-add-change').on('click', 'button.yes', { 'jsObject': this }, this.AddNewCustomer);
        $('#dialog-warning-add-change').on('click', 'button.no', function () {
            $('#dialog-warning-add-change').dialog('close');
            $('#dialog.add-customer').dialog('close');
        });
        $('#dialog-warning-add-change').on('click', 'button.close', function () {
            $('#dialog-warning-add-change').dialog('close');
        });

        $('#dialog-warning-edit-change').on('click', 'button.yes', function () {
            $('#dialog-warning-edit-change').dialog('close');
        });
        $('#dialog-warning-edit-change').on('click', 'button.yes', this.EditCustomer.bind(this));
        $('#dialog-warning-edit-change').on('click', 'button.no', function () {
            $('#dialog-warning-edit-change').dialog('close');
            $('#dialog.edit-customer').dialog('close');
        });
        $('#dialog-warning-edit-change').on('click', 'button.close', function () {
            $('#dialog-warning-edit-change').dialog('close');
        });

        $('.bottom-content').on('click', 'button.page-next', this.ClickButtonNextPagingTable.bind(this));
        $('.bottom-content').on('click', 'button.page-last', this.ClickButtonLastPagingTable.bind(this));
        $('.bottom-content').on('click', 'button.page-prev', this.ClickButtonPrevPagingTable.bind(this));
        $('.bottom-content').on('click', 'button.page-first', this.ClickButtonFirstPagingTable.bind(this));

        $('#dialog.add-customer .error-mark').mouseover(this.AppearValidateMessage);
        $('#dialog.add-customer .error-mark').mouseleave(this.HiddenValidateMessage);
    } 

    /**
     * Khi di chuot vao dau ! thi hien len canh bao
     * nguoi tao: daon thi mai
     * ngay tao: 27/8/2019
     * */
    AppearValidateMessage() {
        $(this).next().css({ "visibility": "visible" });
        var propertyName = $(this).prev().attr('property');
        if (propertyName == 'CustomerName') {
            if ($(this).next().children().hasClass(propertyName)) {
                $('.validate-error .CustomerName').text('Tên khách hàng không hợp lệ');
            }
        }
        if (propertyName == 'RefNo') {
            if ($(this).next().children().hasClass(propertyName)) {
                $('.validate-error .RefNo').text('Mã khách hàng không hợp lệ');
            }
        }
        if (propertyName == 'PhoneNumber') {
            if ($(this).next().children().hasClass(propertyName)) {
                $('.validate-error .PhoneNumber').text('Số điện thoại không hợp lệ');
            }
        }
    }

    /**
     * Khi chuot roi di thi canh bao bien ma
     *  nguoi tao: daon thi mai
     * ngay tao: 27/8/2019
     * */
    HiddenValidateMessage() {
        $(this).next().css({ "visibility": "hidden" });
    }

    /**
     * Ham chuyen trang khi nhan vao button phan trang
     * nguoi tao: doan thi mai
     * ngay tao: 27/8/2019
     * @param {any} evt
     */
    ClickButtonNextPagingTable() {
        var page = $('#_pageIndex').val();
        page = parseInt(page) + 1;
        $('#_pageIndex').val(page);
        this.LoadData();
        this.SetStatusButtonPaging(this);
    }


    /**
     * Ham chuyen trang khi nhan vao button chuyen trang tiep theo
     * nguoi tao: doan thi mai
     * ngay tao: 26/8/2019
     * @param {any} evt
     */
    ClickButtonFirstPagingTable() {
        $('#_pageIndex').val('1');
        this.LoadData();
        this.SetStatusButtonPaging(this);
    }


    /**
     * Ham chuyen trang khi nhan vao button chuyeenr ddeens trang cuoi
     * @param {any} evt
     */
    ClickButtonLastPagingTable() {
        var page = $('#_pageIndex').val();
        var pageSize = $('#_pageSize option:selected').val();
        var length = this.GetData().length;
        var pages = length / pageSize;

        if (pages / 2 == 0) {
            pages = parseInt(pages);
        } else {
            pages = parseInt(pages) + 1;
        }

        page = pages;
        $('#_pageIndex').val(page);
        this.LoadData();
        this.SetStatusButtonPaging(this);
    }


    /**
     * Ham chuyen trang khi nhan vao button phan trang
     * @param {any} evt
     */
    ClickButtonPrevPagingTable() {
        var page = $('#_pageIndex').val();
        page = parseInt(page) - 1;
        $('#_pageIndex').val(page);
        this.LoadData();
        this.SetStatusButtonPaging(this);
    }

    /*
     * Chỉ cho phép nhập các ký tự số
     * nguoi tao: MVManh
     * ngay tao:03/03/2018
     */
    isNumberKey(evt) {
        var charCode = evt.which ? evt.which : event.keyCode;
        if (charCode === 59 || charCode === 46)
            return true;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    /**
     * Mo dialog canh bao
     * nguoi tao: doan thi mai
     * ngay tao: 25/8/2019
     * */
    OpenDialogWarning() {
        $("#dialog-warning-delete").dialog({
            modal: true,
            width: 400,
            height: 150
        });
    }

    /**
     * Ham cuon thanh cuon tu dong theo cac hang da chon
     * nguoi tao: doan thi mai
     * ngay tao: 25/8/2019
     * */
    DirectionScroll() {
        var container = $('.table-content');
        var scrollTo = $('.main-table .select');
        var scroll = scrollTo.offset().top - container.offset().top + container.scrollTop() - (container.height() / 2);
        $(container).scrollTop(scroll);
    }

    /**
     * Ham thuc hien tao phim tat cho chon hang du lieu
     * nguoi tao: doan thi mai
     * ngay tao; 25/8/2019
     *
     * @param {any} event
     */
    ShortCutMethod() {
        var me = this;

        $(document).bind('keydown', 'down', function () {
            var rowSelected = $('tr.select');            
            var lastScroll = $('.main-table tbody').children().last().hasClass('select');
            if (!lastScroll) {
                $('.main-table tr').removeClass('select');
                rowSelected.next().addClass('select');
                me.DirectionScroll();
            } else {
                $('.main-table tbody').children().last().addClass('select');
            }                      
        });

        $(document).bind('keydown', 'up', function () {
            var rowSelected = $('tr.select');
            var lastScroll = $('.main-table tbody').children().first().hasClass('select');
            if (!lastScroll) {
                $('.main-table tr').removeClass('select');
                rowSelected.prev().addClass('select');
                me.DirectionScroll();
            } else {
                $('.main-table tbody').children().first().addClass('select');
            }           
        });

        $(document).bind('keydown', 'shift+down', function () {
            var rowSelected = $('tr.select');
            rowSelected.next().addClass('select');
        });

        $(document).bind('keydown', 'shift+up', function () {
            var rowSelected = $('tr.select');
            rowSelected.prev().addClass('select');
        });

        $(document).bind('keydown', 'ctrl+1', function () {
            event.preventDefault();
            me.OpenDialogAdd();
        });

        $(document).bind('keydown', 'ctrl+2', function (event) {
            event.preventDefault();
            me.OpenDialogDublicate();
        });

        $(document).bind('keydown', 'ctrl+z', me.OpenDialogEdit.bind(me));

        $(document).bind('keydown', 'ctrl+4', function () {
            event.preventDefault();
            me.ClickOnDelete();
        });

        $(document).bind('keydown', 'ctrl+5', function () {
            event.preventDefault();
            me.ReloadData();
        });
    }


    /**
     * Ham thuc hien chuc nang phan trang
     * nguoi tao: doan thi mai
     * ngay tao: 23/8/2019
     * */
    PagingTable(event) {
        var me = this;
        if (!this.isNumberKey(event)) {
            this.OpenDialogWarning();
            $('.message-content .message').html('Số trang cần tìm bắt buộc phải là số. Mời nhập lại!');
            $('#dialog-warning button.close').click(function () {
                $('#dialog-warning').dialog('close');
                $('#_pageIndex').css({ "border": "1px solid #cf4c35" });
            })
        }

        if (event.keyCode === 13 && this.isNumberKey(event) == true) {
            $('#_pageIndex').css({ "border": "1px solid #c5c5c5" });
            this.SetStatusButtonPaging(this);
            this.LoadData();
            this.SetStatusButton();
            this.SelectFirstCustomer();
            this.SetStatusButtonPaging(this);
        }
    }

    /**
     * ham thuc hien load du lieu khi thay doi pagesize
     * nguoi tao; doan thi mai
     * ngay tao: 26/9/2019
     * */
    LoadDataByPageSize() {
        var pageSize = $('#_pageSize option:selected').val();
        var length = this.GetData().length;
        var pages = length / pageSize;

        if (pages / 2 == 0) {
            pages = parseInt(pages);
        } else {
            pages = parseInt(pages) + 1;
        }

        $('span.page-length').html('trên ' + pages);
        this.LoadData();
    }
   

    /**
     * ham thuc hien load lai du lieu
     * nguoi tao: doan thi mai
     * ngay tao: 23/8/2019
     * @param {any} event
     */
    ReloadData() {
        var me = this
        this.LoadData();
        this.SelectFirstCustomer();
        this.SetStatusButton();
        this.SetStatusButtonPaging(this);
    }

    /**
     * ham thuc hien thanh chon 
     * nguoi tao: doan thi mai
     * ngay tao; 23/8/2019
     * */
    ShowFilterType(event) {       
        $(this).addClass('selected-type');
        var me = event.data['jsObject'];
        $('.filter-select.disable-option').hide();
        $(this).nextAll().toggle();
        $('.table-th').on('click', '.filter-select.disable-option', me.SelectFilterType);
    }

    /**
     * ham chon loai du lieu muon loc
     * nguoi tao: doan thi mai
     * ngay tao: 23/8/2019
     * */
    SelectFilterType() {
        var select = $(this).text();
        $('.filter-select.select-default.selected-type').html(select);
        $('.filter-select.disable-option').hide();
        $('.filter-select').removeClass('selected-type');
    }

    /**
     * ham them ma khach hang tu dong
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     * */
    AutoRefNo() {
        var me = this;
        var data = me.GetData();
        var fields = $('.main-table th[fieldName]');
        var listRefNo = [];
        var listNumber = [];

        $.each(data, function (index, item) {
            var rowHTML = $('<tr></tr>').data('recordID', item["RefID"]);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                if (fieldName == 'RefNo') {
                    var refNo = item[fieldName];
                    listRefNo.push(refNo);
                }
               
            });
        });

        $.each(listRefNo, function (index, item) {
            var refNoArray = item.split('KH');
            var numberRefNo = refNoArray[1];
            var number = parseInt(numberRefNo);
            listNumber.push(number);
        })

        var length = listNumber.length;
        var autoRefNo = 0;
        for (var i = 1; i < 1000; i++){
            var tem = true;
            for (var j = 0; j < length; j++) {
                if (i === listNumber[j]) {
                    tem = false;
                } else {
                    autoRefNo = i;
                }
                if (!tem) break;
            }
            if (autoRefNo != 0 && tem == true) break;
        }
        return autoRefNo;
    }

    /**
     * Ham load thong tin khach hang ra Dialog Edit
     * nguoi tao: doan thi mai
     * ngay tao: 4/8/2019
     * */
    LoadInfoCustomer() {
        var me = this;
        var listInput = $('#dialog [property]');
        var listValue = $('.select td');

        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            var row = this;
            $.each(listValue, function (index, item) {
                var col = this;

                if ($(this).hasClass(propertyName)) {
                    $(row).val($(this).text());
                    var value = $(this).text();
                }
            });
        });

    }

    /***
     * ham lay thong tin cua khach hang tai cac o input de sua
     * nguoi tao: doan thi mai
     * ngay tao: 23/8/2019
     * */

    GetInforCustomerEdit() {
        var me = this;
        var listInput = $('#dialog.edit-customer [property]');
        var object = {};

        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val(); 
            object[propertyName] = value;                  
        });

        var member5Food = $('.select').children('.Member5Food').hasClass('check');
        var status = $('.select').children('.Status').hasClass('check');

        if (member5Food) {
            object['Member5Food'] = 'Có';
        } else {
            object['Member5Food'] = 'Không';
        }
        if (status) {
            object['Status'] = 'Ngừng theo dõi';
        } else {
            object['Status'] = 'Đang theo dõi';
        }

        object['RefID'] = $('.select').data('recordID');
        return object;
    }

    /**
     * Ham thuc hien chuc nang sua khach hang
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     * */
    EditCustomer() {       
        var me = this;
        var object = me.GetInforCustomerEdit();

        if (me.CheckInputObligatoryEdit()) {
            $.ajax({
                method: 'PUT',
                url: '/refs',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (res) {
                    $('#dialog.edit-customer').dialog('close');
                    me.LoadData();
                    me.SetStatusButton();
                    me.SelectFirstCustomer();
                },
                error: function (res) {
                    alert(res.Message);
                }
            });
        } else {
            me.ValidateInputSaveEdit();
        }
        
    }

    /***
     * ham thuc hien sua mot khahc hang roi mo tiep cua so htem moi khach hang
     * nguoi tao: doan thi mai
     * ngay tao: 23/8/2019
     * */
    EditCustomerAgain() {
        var me = this;
        var object = me.GetInforCustomerEdit();

        if (me.CheckInputObligatoryEdit()) {
            $.ajax({
                method: 'PUT',
                url: '/refs',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (res) {
                    $('#dialog.edit-customer').dialog('close');
                    me.LoadData();
                    me.SetStatusButton();
                    me.SelectFirstCustomer();
                    me.OpenDialogAdd();
                },
                error: function (res) {
                    alert(res.Message);
                }
            });
        } else {
            me.ValidateInputSaveEdit();
        }
    }

    /**
     * Ham thuc hien lay thong tin tai cac o input de them moi
     * nguoi tao: doan thi mai
     * ngay tao: 23/8/2019
     * */
    GetInforCustomerAdd() {
        var me = this;
        me.AutoRefNo();
        var listInput = $('#dialog.add-customer [property]');
        var object = {};

        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val();
            if (value == null) value = '';
            object[propertyName] = value;
        });

        object['Member5Food'] = 'Không';
        object['Status'] = 'Đang theo dõi';

        return object;
    }

        /**
     * Ham thuc hien chuc nang them moi 1 khach hang
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     * */
    AddNewCustomer(event) {
        var me = event.data['jsObject'];
        var object = me.GetInforCustomerAdd();

        if (me.CheckInputObligatoryAdd()) {
            $.ajax({
                method: 'POST',
                url: '/refs',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(object),
                success: function (res) {
                    if (res.Success) {
                        $('#dialog.add-customer').dialog('close');
                        me.LoadData();
                        me.SetStatusButton();
                        me.SelectFirstCustomer();
                    } else {
                        alert(res.Message);
                    }
                },
                error: function (res) {

                }
            });
        } else {
            me.ValidateInputSaveAdd();
        }
        
    }

    /**
     * ham thuc hien chuc nang them khach hang va mo tiep dialog them khach hang
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     **/
    AddNewCustomerAgain() {
        var me = this;
        var listInput = $('#dialog.add-customer [property]');
        var object = {};

        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val();
            if (value == null) value = '';
            object[propertyName] = value;
        });

        object['Status'] = 'Đang theo dõi';

        if (me.CheckInputObligatoryAdd()) {
            $.ajax({
                method: 'POST',
                url: '/refs',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(object),
                success: function (res) {
                    if (res.Success) {
                        me.CloseDialogAdd();
                        me.LoadData();
                        me.OpenDialogAdd();
                        me.SelectFirstCustomer();
                    } else {
                        alert(res.Message);
                    }
                },
                error: function (res) {

                }
            });
        } else {
            me.ValidateInputSaveAdd();
        }
        
    }

    /**
     * Ham thuc hien xoa 1 khach hang
     * nguoi tao: doan thi mai
     * ngay tao; 21/8/2019
     * */
    ClickOnDelete() {
        var me = this;
        var listRefID = me.GetListID();

        this.OpenDialogMessage();
        if (listRefID.length === 1) {
            var refNo = $('.select .RefNo').text();
            var customerName = $('.select .CustomerName').text();
            $('#dialog-message .message').text('Bạn có chắc chắn muốn xóa khách hàng <<' + refNo + ' - ' + customerName + '>> không?');
        } else {
            $('#dialog-message .message').text('Bạn có chắc chắn muốn xóa những Khách hàng đã chọn không?');
        }
           
        $('#dialog-message').on('click', 'button.yes', function () {
            $.ajax({
            method: 'DELETE',
            url: '/refs',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(listRefID),
            success: function (res) {
                if (res.Success) {
                    me.LoadData();
                    me.SetStatusButton();
                    me.CloseDialogMessage();
                } else {
                    alert(res.Message);
                }
            },
            error: function (res) {

            }
        });
        })
        $('#dialog-message').on('click', 'button.no', function () {
            me.CloseDialogMessage();
        });
    }

    /**
     * ham lay RefID khi click vao 1 row
     * người tao: đoàn thị mai
     * ngay tao: 21/8/2019
     * */
    GetListID() {
        var listRowID = $('.select,.tick');
        var listID = [];
        $.each(listRowID, function (index, item) {
            var itemID = $(item).data('recordID');
            listID.push(itemID);
        });
        return listID;
    }

    /**
     * Ham thuc hien chuc nang chon 1 hang hay chon nhieu hang
     * nguoi tao: doan thi mai
     * ngay tao: 21/8/2019
     * 
     */
    RowOnClick() {
        var me = this;
        $('.main-table tbody').on('click', 'tr', function (event) {
            if (event.ctrlKey) {
                $('button.delete').removeAttr('disabled');
                $('button.edit').attr('disabled', 'disabled');
                $('button.duplicate').attr('disabled', 'disabled');
                $(this).toggleClass('select');
            } else {                
                $('button').removeAttr('disabled');
                $('tr').removeClass('select'); //loai bo hang dang duoc tich
                $(this).toggleClass('select');
            }
        });
    }

    /**
     * Ham thuc hien chuc nang chon cac o checkbox
     * nguoi tao: doan thi mai
     * ngay tao: 23/8/2019
     * */
    TickCheckBox(event) {
        var me = event.data['jsObject'];
        $('.main-table tr').removeClass('select');
        $(this).parent().addClass('select');
        $(this).toggleClass('check');//this la o check-box 
        $(this).toggleClass('uncheck');
        me.GetInforEditCheckBox();
        me.SetStatusButtonPaging(this);
        me.SetStatusButton();
    }

    /**
     * ham lay thong tin cua 1 khach hang bang refNo
     * nguoi tao: doan thi mai
     * ngay tao: 24/8/2019
     * @param {any} me
     */
    GetCusByRefNo() {
        var refNo = $('.select .RefNo').text();
        var listInput = $('#dialog.add-customer [property]');
        var object = {};

        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            object[propertyName] = '';
        });

        object['Member5Food'] = 'Không';
        object['Status'] = 'Đang theo dõi';

        $.ajax({
            method: 'GET',
            url: '/refs/' + refNo,
            async: false,
            success: function (res) {
                if (res.Success) {
                    object = res.Data;
                }
            },
            error: function (res) {
                alert(res.Message);
            }
        })
        return object;
    }

    /**
     * Ham lay thong tin cac o check box de sua
     * nguoi tao: doan thi mai
     * ngay tao: 24/8/2019
     * */
    GetInforEditCheckBox() {
        var cus = {};
        var ref = this;

        var listFieldName = $('.main-table th[fieldName]');
        var listValue = $('.select td');

        $.each(listFieldName, function (index, item) {
            var fieldName = item.getAttribute('fieldName');
            var me = this;
            $.each(listValue, function (index, item) {
                var me = this;
                if ($(this).hasClass(fieldName)) {
                    cus[fieldName] = $(this).text();
                }
            });
        });

        var member5Food = $('.select').children('.Member5Food').hasClass('check');
        var status = $('.select').children('.Status').hasClass('check');

        if (member5Food) {
            cus.Member5Food = 'Có';
        } else {
            cus.Member5Food = 'Không';
        }
        if (status) {
            cus.Status = 'Ngừng theo dõi';
        } else {
            cus.Status = 'Đang theo dõi';
        }

        cus['RefID'] = $('.select').data('recordID');
        $.ajax({
            method: 'PUT',
            url: '/refs',
            data: JSON.stringify(cus),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (res) {
                if (res.Success) {
                    //ref.LoadData();
                }
            },
            error: function (res) {
                alert(res.Message);
            }
        });
    }

    /**
     * Ham sua thong tin cua khach hang khi thay doi o checkbox
     * nguoi tao; doan thi mai
     * ngay tao: 24/8/2019
     * @param {any} cus
     */
    EditCheckBox(cus) {
        var me = this;
        var object = cus;
        debugger
        $.ajax({
            method: 'PUT',
            url: '/refs',
            data: JSON.stringify(object),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (res) {
                debugger
                //me.LoadData();
                //me.SetStatusButton();
                //me.SelectFirstCustomer();
            },
            error: function (res) {
                alert(res.Message);
            }
        });
    }

    /**
     * Ham thuc hien chuc nang check validate cho cac o input khi dang nhap du lieu
     * nguoi tao: doan thi mai
     * ngay tao:22/8/2019
     */
    ValidateInput() {
        $('input[property="RefNo"], input[property="PhoneNumber"], input[property="CustomerName"]').blur(function () {
            var value = this.value;
            if (!value) {
                $(this).addClass('validate');
                $(this).next().addClass('error-input');
            }
            else {
                $(this).removeClass('validate');
                $(this).next().removeClass('error-input');
            }
        })       
    }

    /**
     * Ham thuc hien check cac o input khi an nut save
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     * */
    
    ValidateInputSaveAdd() {
        var refNo = $('#dialog.add-customer input[property="RefNo"]').val();        
        if (!refNo) {
            $('#dialog.add-customer input[property="RefNo"]').addClass('validate');
            $('#dialog.add-customer input[property="RefNo"]').next().addClass('error-input');
        } 

        var customerName = $('#dialog.add-customer input[property="CustomerName"]').val();
        if (!customerName) {
            $('#dialog.add-customer input[property="CustomerName"]').addClass('validate');
            $('#dialog.add-customer input[property="CustomerName"]').next().addClass('error-input');
        } else {
            $('#dialog.add-customer input[property="CustomerName"]').removeClass('validate');
            $('#dialog.add-customer input[property="CustomerName"]').next().removeClass('error-input');
        }

        var phoneNumber = $('#dialog.add-customer input[property="PhoneNumber"]').val();
        if (!phoneNumber) {
            $('#dialog.add-customer input[property="PhoneNumber"]').addClass('validate');
            $('#dialog.add-customer input[property="PhoneNumber"]').next().addClass('error-input');
        } else {
            $('#dialog.add-customer input[property="PhoneNumber"]').removeClass('validate');
            $('#dialog.add-customer input[property="PhoneNumber"]').next().removeClass('error-input');
        }
    }

    ValidateInputSaveEdit() {
        var refNo = $('#dialog.edit-customer input[property="RefNo"]').val();
        if (!refNo) {
            $('#dialog.edit-customer input[property="RefNo"]').addClass('validate');
            $('#dialog.edit-customer input[property="RefNo"]').next().addClass('error-input');
        }

        var customerName = $('#dialog.edit-customer input[property="CustomerName"]').val();
        if (!customerName) {
            $('#dialog.edit-customer input[property="CustomerName"]').addClass('validate');
            $('#dialog.edit-customer input[property="CustomerName"]').next().addClass('error-input');
        }

        var phoneNumber = $('#dialog.edit-customer input[property="PhoneNumber"]').val();
        if (!phoneNumber) {
            $('#dialog.edit-customer input[property="PhoneNumber"]').addClass('validate');
            $('#dialog.edit-customer input[property="PhoneNumber"]').next().addClass('error-input');
        } else {
            $('#dialog.edit-customer input[property="PhoneNumber"]').removeClass('validate');
            $('#dialog.edit-customer input[property="PhoneNumber"]').next().removeClass('error-input');
        }
    }

    /**
     * Ham thuc hien chuc nang mo datepicker khi click vao input ngay sinh
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     */
    OpenDatepicker() {
        var me = $(this).siblings('.input-datepicker');
        me.datepicker({ dateFormat: 'dd/mm/yy' });
        me.focus();
    }

    /**
     * ham kiem tra thong tin tren dialog co thay doi khong
     * nguoi tao: doan thi mai
     * ngay tao: 25/8/2019
     * */
    IsDataAddNotChanged() {
        var listInput = $('#dialog.add-customer [property]');
        var notChanged = true;

        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val();
            if (propertyName != 'RefNo' && value != '') {
                notChanged = false;
            }
        });
        return notChanged;
    }

    /**
     * Ham dong Dialog
     * nguoi tao: doan thi mai
     * ngay tao:22/8/2019
     * */
    CloseDialogAdd() {
        var me = this;

        if (me.IsDataAddNotChanged()) {
            $('#dialog.add-customer').dialog('close');
            $('#dialog input').val('');            
        } else {
            $('#dialog-warning-add-change').dialog({
                modal: true,
                width: 400,
                height: 150
            });
            $('.message-content .message').html('Dữ liệu đã thay đổi, bạn có muốn cất không?');
        }
    }

    /**
     * ham kiem tra dialog edit du lieu co thay doi khong
     * nguoi tao: doan thi mai
     * ngya tao: 25/8/2019
     * */
    IsDataEditNotChanged() {
        var oldObject = this.GetCusByRefNo();
        var newObject = this.GetInforCustomerEdit();
        oldObject['Group'] = newObject['Group'];
        oldObject['BirthDay'] = newObject['BirthDay'];

        var listInput = $('#dialog.add-customer [property]');
        var notChanged = true;

        $.each(listInput, function (index, item) {
            var propertyName = item.getAttribute('property');
            if (oldObject[propertyName] != newObject[propertyName]) {
                notChanged = false;
                return notChanged;
            }
        });
        return notChanged;
    }

    CloseDialogEdit() {
        if (this.IsDataEditNotChanged()) {
            $('#dialog.edit-customer').dialog('close');
            $('#dialog input').val('');
        } else {
            $('#dialog-warning-edit-change').dialog({
                modal: true,
                width: 400,
                height: 150
            });
            $('.message-content .message').html('Dữ liệu đã thay đổi, bạn có muốn cất không?');
        }
    }

    /**
     * Ham mo dialog them khach hang
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     */
    OpenDialogAdd() {
        $("#dialog.add-customer").dialog({
            modal: true, //khi hien dialog thi ko the thao tac voi cot du lieu de xoa
            height: 330,
            width: 675
        });

        $('#dialog input').val('');
        $('input[property="RefNo"], input[property="PhoneNumber"], input[property="CustomerName"]').removeClass('validate');
        $('input[property="RefNo"], input[property="PhoneNumber"], input[property="CustomerName"]').next().removeClass('error-input');
        this.LoadRefNo();
    }

    /**
     * Ham thuc hien load refNo vao dialog
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     * */
    LoadRefNo() {
        var me = this;

        var number = me.AutoRefNo()
        if (number < 10) {
            var autoRefNo = 'KH000' + number;
        }
        if (number > 9 && number < 100) {
            var autoRefNo = 'KH00' + number;
        }
        if (number > 99 && number < 1000) {
            var autoRefNo = 'KH0' + number;
        }
        $('#dialog input[property="RefNo"]').val(autoRefNo);
    }


    /**
     * Ham mo dialog sua khach hang
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     */
    OpenDialogEdit() {
        //var me = event.data["jsObject"];
        var me = this;
        $("#dialog.edit-customer").dialog({
            modal: true, //khi hien dialog thi ko the thao tac voi cot du lieu de xoa
            height: 330,
            width: 675
        });

        me.LoadInfoCustomer();

    }

    OpenDialogDublicate() {
        $("#dialog.add-customer").dialog({
            modal: true, //khi hien dialog thi ko the thao tac voi cot du lieu de xoa
            height: 330,
            width: 675
        });

        this.LoadInfoCustomer();
        this.LoadRefNo();
        this.ValidateInputSaveAdd();
    }

    /**
     * ham thuc hien mo dialog thong bao
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     */
    OpenDialogMessage() {
        $("#dialog-message").dialog({
            modal: true,
            width: 400,
            height: 150
        });
    }

    /**
     * ham thuc hien dong dialog-message
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     * @param {any} o
     */
    CloseDialogMessage() {
        $("#dialog-message").dialog('close');
    }

    /**
     * Ham thuc hien kiem tra da dien du cac truong thong tin bat buoc chua
     * nguoi tao: doan thi mai
     * ngay tao: 22/8/2019
     */
    CheckInput(o) {
        if (o.val().length < 1) {
            return false;
        } else { return true; }
    }

    /**
     * ham thuc hien chuc nang kiem tra thong tin cac truong bat buoc
     * nguoi tao: doan thi mai 
     * ngay tao: 22/8/2019
     */
    CheckInputObligatoryAdd() {
        var status = true;
        status = status && this.CheckInput($('#dialog.add-customer input[property="RefNo"]'))
        status = status && this.CheckInput($('#dialog.add-customer input[property="CustomerName"]'));
        status = status && this.CheckInput($('#dialog.add-customer input[property="PhoneNumber"]'));
        return status;
    }

    CheckInputObligatoryEdit() {
        var status = true;
        status = status && this.CheckInput($('#dialog.edit-customer input[property="RefNo"]'))
        status = status && this.CheckInput($('#dialog.edit-customer input[property="CustomerName"]'));
        status = status && this.CheckInput($('#dialog.edit-customer input[property="PhoneNumber"]'));
        return status;
    }
}