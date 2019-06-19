export function validateUserName (userName) {
  let flag = true
  let msg = ''
  userName = userName.trim()
  if (userName === '') {
    flag = false
    msg = '请输入用户名'
  }
  return { flag, msg }
}

export function validatePassword (password) {
  let flag = true
  let msg = ''
  password = password.trim()
  if (password === '') {
    flag = false
    msg = '请输入密码'
  } else if (password.length < 8) {
    flag = false
    msg = '请输入至少8位密码'
  }
  return { flag, msg }
}

export function validateRepeatPwd (repeatPwd, password) {
  let flag = true
  let msg = ''
  repeatPwd = repeatPwd.trim()
  if (repeatPwd === '') {
    flag = false
    msg = '请确认密码'
  } else if (repeatPwd !== password) {
    flag = false
    msg = '两次密码输入不一致'
  }
  return { flag, msg }
}
