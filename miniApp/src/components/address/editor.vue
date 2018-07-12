<template>
    <div>
        <div class="wrap addressEdit">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd weui_text">
                        <input class="weui-input" id="name" type="text" placeholder="收件人姓名">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd weui_text">
                        <input class="weui-input" type="number" id="phone" pattern="[0-9]*" placeholder="手机号">
                    </div>
                </div>
                <div class="weui-cell provincePicker">
                    <div class="weui-cell__bd">
                        <input class="weui-input" id="provincePicker" type="text" value="省">
                    </div>
                </div>
                    <div class="weui-cell">
                    <div class="weui-cell__bd weui_text">
                        <textarea class="weui-textarea" placeholder="详细地址(无需重复填写省市区)" rows="4" id="addressInfo" max-length="60"></textarea>
                        <div class="weui-textarea-counter"><span class="weui-cell-warn">已经超过60个字了！</span><span id="count">0</span>/60</div>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd weui_text">
                        <input class="weui-input" type="number" pattern="[0-9]*" placeholder="邮政编码(选填)" id="postCode" />
                    </div>
                </div>
            </div>
        </div>

        <div class="buttons_bottom saveDiv themeBtn_double_container fixedBtn">
            <a class="buttons_buttom_cancel themeBtn_double_cancel"><i></i>取消</a>
            <a class="buttons_buttom_ok active themeBtn_double_confirm">保存</a>
        </div>

        <div id="dialog">

        </div>
    </div>
</template>
<script>
export default {
    props : ["editor"],
}
</script>

