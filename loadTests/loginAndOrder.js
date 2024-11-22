// Creator: WebInspector 537.36

import { sleep } from 'k6'
import http from 'k6/http'

export const options = {}

export default async function main() {
  let response

  response = http.put(
    'https://jwt-pizza-service.msouthwick.com/api/auth',
    '{"email":"b@jwt.com","password":"b"}',
    {
      headers: {
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'Content-Type': 'application/json',
        'sec-ch-ua-mobile': '?0',
      },
    }
  )

  let token = await response.json().token;

  response = http.get('https://jwt-pizza-service.msouthwick.com/api/order/menu', {
    headers: {
      'sec-ch-ua-platform': '"Windows"',
      'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      'Content-Type': 'application/json',
      'sec-ch-ua-mobile': '?0',
    },
  })

  response = http.get('https://jwt-pizza-service.msouthwick.com/api/franchise', {
    headers: {
      'sec-ch-ua-platform': '"Windows"',
      'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      'Content-Type': 'application/json',
      'sec-ch-ua-mobile': '?0',
    },
  })

  response = http.post(
    'https://jwt-pizza-service.msouthwick.com/api/order',
    '{"items":[{"menuId":1,"description":"Veggie","price":0.0038},{"menuId":2,"description":"Pepperoni","price":0.0042},{"menuId":3,"description":"Margarita","price":0.0042},{"menuId":4,"description":"Crusty","price":0.0028}],"storeId":"1","franchiseId":1}',
    {
      headers: {
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'Content-Type': 'application/json',
        'sec-ch-ua-mobile': '?0',
        'Authorization': 'Bearer '+token
      },
    }
  )

  let jwt = await response.json().jwt;

  response = http.post(
    'https://pizza-factory.cs329.click/api/order/verify',
    JSON.stringify({jwt}),
    {
      headers: {
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'Content-Type': 'application/json',
        'sec-ch-ua-mobile': '?0',
        'Authorization': 'Bearer '+token
      },
    }
  )

  // Automatically added sleep
  sleep(1)
}