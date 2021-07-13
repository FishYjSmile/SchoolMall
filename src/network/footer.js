import {request} from './request';
export function getfooter() {
  return request({
    url: '/json/footer.json'
  })
}
