class Base {
    constructor() {
        this.LoadData();
        this.SetStatusButton();
        this.SelectFirstCustomer();
    }

    GetData() {
        var fakeData = [];

        $.ajax({
            method: 'GET',
            url: '/refs',
            async: false,
            success: function (res) {
                if (res.Success) {
                    fakeData = res.Data;
                } else {
                    alert(res.Message);
                }
            },
            error: function (res) {
            }
        })
        return fakeData;
    }

    /**
     * Ham thuc hien lay du lieu ra HTML
     * nguoi tao: doan thi mai
     * ngay tao: 2/8/2019
     * */
    LoadData() {
        var me = this;
        var pageIndex = $('#_pageIndex').val();
        var pageSize = $('#_pageSize option:selected').val();
        var fields = $('.main-table th[fieldName]');

        var length = me.GetData().length;
        var pageLength = length / pageSize;
        if (pageLength / 2 == 0) {
            pageLength = parseInt(pageLength);
        } else {
            pageLength = parseInt(pageLength) + 1;
        }

        if (pageIndex > pageLength) {
            $('#_pageIndex').val(pageLength);
            pageIndex = pageLength;
        }

        $('.main-table tbody').empty();

        $.ajax({
            method: 'GET',
            url: '/refs/' + pageIndex + '/' + pageSize,
            async: false,
            success: function (res) {
                if (res.Success) {
                    var data = res.Data;
                    $.each(data, function (index, item) {
                        var rowHTML = $('<tr></tr>').data('recordID', item["RefID"]);
                            $.each(fields, function (fieldIndex, fieldItem) {
                                var fieldName = fieldItem.getAttribute('fieldName');
                                var value = item[fieldName];
                                var cls = 'text-left';

                                if (value == null) value = '';

                                var type = $.type(value);
                                switch (type) {
                                    case "date": value = value.formatddMMyyyy();
                                        cls = 'text-center';
                                        break;
                                    case "number": value = value.formatMoney();
                                        cls = 'text-right';
                                        break;
                                }

                                if (fieldName == 'Member5Food') {
                                    if (value == 'Có') {
                                        rowHTML.append('<td class ="Member5Food check"></td>');
                                    } else if (value == 'Không') {
                                        rowHTML.append('<td class ="Member5Food uncheck"></td>');
                                    }                                      
                                } else if (fieldName == 'Status') {
                                    if (value == 'Ngừng theo dõi') {
                                        rowHTML.append('<td class ="Status check"></td>');
                                    } else {
                                        rowHTML.append('<td class ="Status uncheck"></td>');
                                    }
                                } else if (fieldName != 'BirthDay' && fieldName != 'Group') {
                                    rowHTML.append('<td class = "{1} {2}">{0}</td>'.format(value, cls, fieldName));
                                }
                            });

                            $('.main-table tbody').append(rowHTML);
                    });
                    me.SelectFirstCustomer();
                    $('.table-content').scrollTop(0);
                } else {
                    alert(res.Message);
                }
            },
            error: function (res) {
            }
        })  

        if (pageIndex == pageLength) {
            var orderlabel = 'Hiển thị ' + ((pageIndex - 1) * pageSize + 1) + ' - ' + (((pageIndex - 1) * pageSize + 1) + (length - (pageIndex - 1) * pageSize) - 1) + ' trên ' + length + ' kết quả';
        } else {
            var orderlabel = 'Hiển thị ' + ((pageIndex - 1) * pageSize + 1) + ' - ' + pageIndex * pageSize + ' trên ' + length + ' kết quả';
        }
        $('.bottom-right span').text(orderlabel);
    }

    /**
     * ham thay doi trang thai cua button Xoa
     * nguoi tao: doan thi mai
     * ngay tao: 2/8/2019
     */
    SetStatusButton() {
        var sizetable = $('.main-table tbody tr').length;
        if (sizetable === 0) { //2 dau = la cug gia tri, 3 = cung ca kieu nua
            $('button.delete').attr('disabled', 'disabled');
            $('button.edit').attr('disabled', 'disabled');
            $('button.duplicate').attr('disabled', 'disabled');
        }

        var listRowID = $('.select,.tick').length;
        if (listRowID === 0) {
            $('button.delete').attr('disabled', 'disabled');
            $('button.edit').attr('disabled', 'disabled');
            $('button.duplicate').attr('disabled', 'disabled');
        }
       
    }

    /**
     * Ham chon khach hang o dau ban ghi
     * nguoi tao: doan thi mai
     * ngay tao: 24/3/2019
     * */
    SelectFirstCustomer() {
        var sizetable = $('.main-table tbody tr').length;
        if (sizetable != 0) {
            $('.main-table tbody tr:first').addClass('select');
            $('button.delete').removeAttr('disabled');
            $('button.edit').removeAttr('disabled');
            $('button.duplicate').removeAttr('disabled');
        }
    }

    /**
     * Ham set trang thai cua button phan trang
     * nguoi tao: daon thi mai
     * ngay tao: 25/8/2019
     */
    SetStatusButtonPaging(ref) {
        var me = ref;
        var pageIndex = $('#_pageIndex').val();
        var pageSize = $('#_pageSize option:selected').val();
        var length = me.GetData().length;
        var pages = length / pageSize;

        if (pages / 2 == 0) {
            pages = parseInt(pages);
        } else {
            pages = parseInt(pages) + 1;
        }

        $('span.page-length').html('trên ' + pages);
        if (pageIndex === '1') {
            if (pages === 1) {
                $('button.page-next').attr('disabled', 'disabled');
                $('button.page-last').attr('disabled', 'disabled');
                $('button.page-first').attr('disabled', 'disabled');
                $('button.page-prev').attr('disabled', 'disabled');
            } else {
                $('button.page-next').removeAttr('disabled');
                $('button.page-last').removeAttr('disabled');
                $('button.page-first').attr('disabled', 'disabled');
                $('button.page-prev').attr('disabled', 'disabled');
            }           
        } else if (pageIndex == pages) {
            $('button.page-first').removeAttr('disabled');
            $('button.page-prev').removeAttr('disabled');
            $('button.page-next').attr('disabled', 'disabled');
            $('button.page-last').attr('disabled', 'disabled');
        }else {
            $('button.page-first').removeAttr('disabled');
            $('button.page-prev').removeAttr('disabled');
            $('button.page-next').removeAttr('disabled');
            $('button.page-last').removeAttr('disabled');
        }
    }

    
}