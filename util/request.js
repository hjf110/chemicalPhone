//通用请求封装
const request = (option)=>{
	// console.log('url-----',url);
	// console.log('method-----',method);
	// console.log('data------',data);
	
	let header={};
	if(option.method==='POST'){
		header['content-type']='application/x-www-form-urlencoded';
	}else if(option.method==='JSON'){
		option.method='POST';
		header['content-type']='application/json';
	}
	
	
	return new Promise((reslove,reject)=>{
		uni.request({
			...option,
			header,
			success(res){
				// console.log('接口返回的信息----',res);
				let data  = res.data;//返回的数据
				if(data.code!='S001'&&data.code!='500'){
					reslove(data);
				}else{
					reject(JSON.stringify(data));
				}
			},
			fail(e){
				reject('网络错误')
			}
		})
	})
}
export default request;