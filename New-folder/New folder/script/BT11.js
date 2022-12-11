function GuiThongTin()
{
    if(username.value==0||username==null)
    {
        mess.innerText="Bạn chưa nhập Tên đăng nhập";
        username.focus();
        return false;
    }
    if(password.value==0||password==null)
    {
        mess.innerText="Bạn chưa nhập Mật khẩu";
        username.focus();
        return false;
    }
    if(username.value=="thang"&&password.value=="123")
    {
        mess.innerText = "Chào bạn";
        login_name.innerText = "Lê Đức Thắng";
        return true;
    }
    else
    {
        mess.innerText="Đăng nhập không hợp lệ";
        username.select();
        return false;
    }
}