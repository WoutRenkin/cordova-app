import requests
import datetime

BASE = "http://192.168.0.205:5000/"

""" response = requests.put(BASE + "restaurant", {"rname":"hmm"})
print(response.json())
input(".........................")


input(".........................")

response = requests.get(BASE + "visit/1")
print(response.json()) """

""" response = requests.put(BASE + "visit", {"firstname":"Wout", "lastname":"Renkin", "useremail":"wout.renkin@hotmail.com", "restaurant_id": 1})
print(response.json()) """



""" response = requests.put(BASE + "restaurant", {"rname":"hmm"})
print(response.json()) """
""" response = requests.get(BASE + "restaurant/1/startdate=2020-10-22/enddate=2020-10-22")
test = response.json()
for x in test:
    print(test[x]) """
response = requests.put(BASE + "restaurant", {"restaurantname":"hmm", 'restaurantemail':'wdqwd@wdq', 'telephonenumber':'04775234'})
print(response.json()) 
response = requests.put(BASE + "visit", {"firstname":"Wout", "lastname":"Renkin", "useremail":"ft.ju@f.com", "restaurant_id": 1})
print(response.json())
response = requests.put(BASE + "visit", {"firstname":"Wout", "lastname":"Renkin", "useremail":"ft.ju@f.com", "restaurant_id": 2})

response = requests.get(BASE + "restaurant/2/startdate=2020-10-22/enddate=2020-10-22")
test = response.json()
print(test)
""" for x in test:
    print(test[x])  """