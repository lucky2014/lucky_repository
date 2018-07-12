<template>
    <div>
        <div class="orderStatus" v-if="msg.status == 1">
            <img class="caiyuanbaoImg" src="https://store.iliujia.com/imgs/b/microOrderStatus1.png" />
            <div>
                <p>订单状态：待付款</p>
            </div>
        </div>
        <div class="orderStatus" v-if="msg.status==2||msg.status==8||msg.status==9">
            <img class="caiyuanbaoImg" src="https://store.iliujia.com/imgs/b/microOrderStatus2.png" />
            <div>
                <p>订单状态：待发货</p>
            </div>
        </div>
        <div class="orderStatus" v-if="msg.status==3">
            <img class="caiyuanbaoImg" src="https://store.iliujia.com/imgs/b/microOrderStatus3_1.png" />
            <div>
                <p>订单状态：待收货</p>
            </div>
        </div>
        <div class="orderStatus" v-if="msg.status==7">
            <img class="caiyuanbaoImg" src="https://store.iliujia.com/imgs/b/microOrderStatus4.png" />
            <div>
                <p>订单状态：已完成</p>
            </div>
        </div>
        <div class="orderStatus" v-if="msg.status==5">
            <img class="caiyuanbaoImg" src="https://store.iliujia.com/imgs/b/microOrderStatus5.png" />
            <div>
                <p>订单状态：已关闭</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props : ["msg"]
}
</script>

