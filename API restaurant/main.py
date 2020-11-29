from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import datetime
app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)


class RestaurantModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurantname = db.Column(db.String(100), nullable=False)
    restaurantemail = db.Column(db.String(100), nullable=False)
    telephonenumber = db.Column(db.String(100), nullable=False)
    visits = db.relationship('VisitModel', backref='restaurant')


class VisitModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    useremail = db.Column(db.String(100), nullable=False)
    time = db.Column(db.Date(), default=db.func.current_date())
    restaurant_id = db.Column(db.Integer, db.ForeignKey(RestaurantModel.id))

db.drop_all()
db.create_all()

restaurant_put_args = reqparse.RequestParser()
restaurant_put_args.add_argument("restaurantname", type=str, help="Restaurant name..", required=True)
restaurant_put_args.add_argument("restaurantemail", type=str, help="Email address.. ", required=True)
restaurant_put_args.add_argument("telephonenumber", type=str, help="Telephone number..", required=True)

restaurant_update_args = reqparse.RequestParser()
restaurant_update_args.add_argument("restaurantname", type=str, help="Restaurant Name")
restaurant_update_args.add_argument("restaurantemail", type=str, help="Email address.. ")
restaurant_update_args.add_argument("telephonenumber", type=str, help="Telephone number..")

visit_put_args = reqparse.RequestParser()
visit_put_args.add_argument("firstname", type=str, help="First name..", required=True)
visit_put_args.add_argument("lastname", type=str, help="Last name..", required=True)
visit_put_args.add_argument("useremail", type=str, help="Email..", required=True)
visit_put_args.add_argument("restaurant_id", type=int, help="ID of restaurant", required=True)

visit_update_args = reqparse.RequestParser()
visit_update_args.add_argument("firstname", type=str, help="First name..")
visit_update_args.add_argument("lastname", type=str, help="Last name..")
visit_update_args.add_argument("useremail", type=str, help="Email..")
visit_update_args.add_argument("restaurant_id", type=int, help="ID of restaurant")



resource_fields = {
    'id': fields.Integer,
    'restaurantname': fields.String,
    'restaurantemail': fields.String,
    'telephonenumber': fields.String,
    'visits': fields.String
}

resource_fields2 = {
    'id': fields.Integer,
    'firstname': fields.String,
    'lastname': fields.String,
    'useremail': fields.String,
    'restaurant_id': fields.Integer
}



class restaurant(Resource):
    def get(self, restaurant_id, startdate, enddate):
        startdate = datetime.datetime.strptime(startdate, "%Y-%m-%d").date()
        enddate = datetime.datetime.strptime(enddate, "%Y-%m-%d").date()

        result = RestaurantModel.query.filter_by(id=restaurant_id).first()
        if not result:
            abort(404, message="We could not find a restaurant with that ID")
        #build an email list based on two time stamps
        email = {}
        for x in range(len(result.visits)):
            if startdate <= result.visits[x].time <= enddate:
                email[x] = result.visits[x].useremail
        #filter out the same emails
        emailNoDuplicates = {}
        for key, value in email.items():
            if value not in emailNoDuplicates.values():
                emailNoDuplicates[key] = value
        
        
        return emailNoDuplicates

class addRestaurant(Resource):
    @marshal_with(resource_fields)
    def put(self):
        args = restaurant_put_args.parse_args()
        restaurant = RestaurantModel(restaurantname=args['restaurantname'], restaurantemail=args['restaurantemail'], telephonenumber=args['telephonenumber'])
        db.session.add(restaurant)
        db.session.commit()
        return restaurant, 201

class patchRestaurant(Resource):
    @marshal_with(resource_fields)
    def patch(self, restaurant_id):
        args = restaurant_update_args.parse_args()
        result = RestaurantModel.query.filter_by(id=restaurant_id).first()
        if not result:
            abort(404, message="Restaurant doesn't exist, can't update..")
        if not result:
            abort(404, message="Restaurant doesn't exist, can't update..")
        if args["restaurantname"]:
            result.restaurantname = args['restaurantname']
        if args["restaurantemail"]:
            result.restaurantemail = args['restaurantemail']
        if args["telephonenumber"]:
            result.email = args['telephonenumber']
        db.session.commit()
        return result

class addVisit(Resource):
    @marshal_with(resource_fields2)
    def put(self):
        args = visit_put_args.parse_args()
        restaurant_id = restaurant_id=args['restaurant_id']
        result = RestaurantModel.query.filter_by(id=restaurant_id).first()
        if not result:
            abort(404, message="Restaurant doesn't exist, can't update..")
        visit = VisitModel(firstname=args['firstname'], lastname=args['lastname'], useremail=args['useremail'], restaurant_id=args['restaurant_id'])

        db.session.add(visit)
        db.session.commit()
        
        return visit, 201
class getVisit(Resource):
    def get(self, visit_id):
        result = VisitModel.query.filter_by(id=visit_id).first()
        if not result:
            abort(404, message="Could not find visit with that ID")
        return result


api.add_resource(restaurant, "/restaurant/<int:restaurant_id>/startdate=<string:startdate>/enddate=<string:enddate>/")
api.add_resource(patchRestaurant, "/restaurant/<int:restaurant_id>")
api.add_resource(addRestaurant, "/restaurant")
api.add_resource(addVisit, "/visit")
api.add_resource(getVisit, "/visit/<int:visit_id>")


if __name__ == "__main__":
    app.run(host="192.168.178.33", debug=True)