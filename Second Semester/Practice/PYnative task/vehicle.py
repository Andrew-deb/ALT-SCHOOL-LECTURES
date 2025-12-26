class vehicle():
    # Class attribute
    color= "White"

    def __init__(self, name, max_speed, mileage:int, capacity=0):
        self.name = name
        self.max_speed= max_speed
        self.mileage= mileage
        self.capacity= capacity
    
    def __str__(self):
        return f"color: {self.color}, Vehicle Name: {self.name}, Speed: {self.max_speed}, Mileage: {self.mileage}"

    def seating_capacity(self, capacity):
        return f"The seating capacity of a {self.name} is {capacity} passengers"
        
class bus(vehicle):
    def __init__(self, name, max_speed, mileage, capacity=50):
        super().__init__(name, max_speed, mileage)
        self.capacity= capacity

    # def seating_capacity(self, capacity):
    #     return super().seating_capacity(capacity)

    def fare(self):
        return (self.capacity * 100) *0.1 + (self.capacity * 100)
    


class car(vehicle):
    pass
    
Bus1= bus("School Volvo", 180, 12, 50)
Car1= car("Audi Q5", 240, 18, 5)
print(type(Bus1))
print(Car1)

# print(Bus1.seating_capacity(200))
# print(Car1.seating_capacity(5))
