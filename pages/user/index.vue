<template>
	<view>
		<view class="my_heade">
			<view class="my_info">
				<view class="my_avater">
					<image src="../../static/logo.png" mode="widthFix"></image>
				</view>
				<view class="my_name">..</view>
			</view>
		</view>
		<view class="nav">
			<view class="nav_title">导航</view>
			<view class="nav_list">
				<view class="nav_item" v-for="(item,index) in navList" :key="index" @click="jump(item.route)">
					<view :class="item.icon" style="font-size:50rpx;margin-bottom:15rpx;"></view>
					<view>{{item.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
						id: 1,
						text: "我的孩子",
						icon: "iconfont icon-haizi",
						route: "./childrenList/index"
					},
					{
						id: 2,
						text: "时间表",
						icon: "iconfont icon-shijianbiao",
						route: "./time/index"
					},
					{
						id: 3,
						text: "历史考勤记录",
						icon: "iconfont icon-lishijilu",
						route: "./record/index"
					}
				]
			}
		},
		methods: {
			jump(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>
	/* @import url("../../font/iconfont.css"); */
	page {
		background-color: #EEF1F7;
	}

	.my_heade {
		height: 300rpx;
		background: linear-gradient(0deg, rgba(85, 205, 216, 1) 0%, rgba(84, 175, 255, 1) 100%);
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.my_avater {
		width: 160rpx
	}

	.my_avater image {
		border-radius: 50%;
		width: 100%;
	}

	.my_name {
		text-align: center;
		color: white;
	}

	.nav {
		width: 690rpx;
		box-sizing: border-box;
		margin: 20rpx auto;
		border-radius: 20rpx;
		padding: 20rpx;
		background: white;
	}

	.nav_title {
		font-size: 40rpx;
		font-weight: 700;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #e1e1e1;
	}

	.nav_list {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.nav_item {
		text-align: center;
	}
</style>
