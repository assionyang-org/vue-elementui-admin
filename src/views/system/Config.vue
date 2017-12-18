<template>
	<section>
		<el-tabs type="card" v-model="activeName">
            <el-tab-pane  label="修改密码" name="first">
                <el-col :span="8">
                	<el-form :model="passForm" label-width="100px" ref="passForm" :rules="passRules">
                	    <el-form-item label="旧密码" prop="oldPass">
                  	        <el-input type="password" auto-complete="off" v-model="passForm.oldPass"></el-input>
                	    </el-form-item>
                	    <el-form-item  label="新密码" prop="newPass">
                  	        <el-input type="password" auto-complete="off" v-model="passForm.newPass"></el-input>
                	    </el-form-item>
               	        <el-form-item label="确认新密码" prop="newPassConfirm">
                  	        <el-input type="password" auto-complete="off" v-model="passForm.newPassConfirm"></el-input>
                	    </el-form-item>
              	    </el-form>
              	    <div>
                	    <el-button type="primary" @click="passSubmit">确认修改密码</el-button>
              	    </div>
                </el-col>
                <el-col :span="16"></el-col>
            </el-tab-pane>
        </el-tabs>
	</section>
</template>

<script>
	export default{
		name:'Config',
		data(){
			return{
				activeName:'first',
				passForm:{
					oldPass:'',
					newPass:'',
					newPassConfirm:''
				},
				passRules: {
                    oldPass: [
                        { required: true, message: '旧密码不能为空', trigger: 'blur' }
                    ],
                    newPass: [
                        { required: true, message: '新密码不能为空', trigger: 'blur' }
                    ],
                    newPassConfirm: [
                        { required: true, message: '确认新密码不能为空', trigger: 'blur' }
                    ]
                }
			}
		},
		methods:{
			passSubmit(){
				 this.$refs.passForm.validate((valid)=>{
				 	if(valid){
				 		this.$message({
                  		message: '修改成功',
                  		type: 'success'
                 		});
				 	}
				 });
			}
		}
	}
</script>