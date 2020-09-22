import { login, logout, getInfo, getAllUserInfo } from '@/api/login'
import { listCountry } from '@/api/home/country'
import { listCity } from '@/api/home/city'
import { listDictionaries } from "@/api/user/dictionaries";
import { getToken, setToken, removeToken,localStoreSetToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
	allUser:[]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
	SET_ALLUSER:(state, allUser)=>{
		state.allUser = allUser
	}
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      //debugger
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.token)
          localStoreSetToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token).then(res => {
        const user = res.user
        localStorage.setItem('currentUser',JSON.stringify(user))
			  const avatar = user.avatar == "" ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
			  if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
				commit('SET_ROLES', res.roles)
				commit('SET_PERMISSIONS', res.permissions)
			  } else {
				commit('SET_ROLES', ['ROLE_DEFAULT'])
			  }
			  commit('SET_NAME', user.username)
			  commit('SET_AVATAR', avatar)
			  resolve(res)
			}).catch(error => {
			  reject(error)
			})
		})
    },

	//获取所有的用户信息
	GetAllUserInfo({ commit, state }){
		return new Promise((resolve, reject)=>{
			getAllUserInfo().then(res => {
				resolve()
			}).catch(error=>{
				reject(error)
			})
      listCountry().then(countryRes => {
        localStorage.setItem("YIHOME_country",JSON.stringify(countryRes.rows))
        resolve()
      }).catch(error=>{
      	reject(error)
      })
      listCity().then(cityRes => {
        localStorage.setItem("YIHOME_city",JSON.stringify(cityRes.rows))
        resolve()
      }).catch(error=>{
      	reject(error)
      })

      listDictionaries().then(typeRes=>{
        localStorage.setItem("YIHOME_user_type",JSON.stringify(typeRes.data))
        resolve()
      }).catch(error=>{
      	reject(error)
      })

		})
	},

  //保存国家城市
  /* GetCountryCity({ commit, state }){
  	return new Promise((resolve, reject)=>{


  		getAllUserInfo().then(res => {
  			console.log(res,97654323);
  			resolve()
  		}).catch(error=>{
  			reject(error)
  		})
  	})
  }, */


    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
