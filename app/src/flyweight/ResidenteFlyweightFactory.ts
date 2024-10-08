class ResidentFlyweight {
  constructor(
    public city: string,
    public buildingType: string
  ) {}

  createResident(name: string, apartment: string) {
    return new ConcreteResident(name, apartment, this);
  }
}

class ConcreteResident {
  constructor(
    public name: string,
    public apartmentNumber: string,
    public flyweight: ResidentFlyweight
  ) {}
}

class ResidentFlyweightFactory {
  private flyweights: { [key: string]: ResidentFlyweight } = {};

  getResidentFlyweight(city: string, buildingType: string): ResidentFlyweight {
    const key = `${city}-${buildingType}`;
    if (!this.flyweights[key]) {
      this.flyweights[key] = new ResidentFlyweight(city, buildingType);
    }
    return this.flyweights[key];
  }

  getFlyweightCount() {
    return Object.keys(this.flyweights).length;
  }
}

const residentFlyweightFactory = new ResidentFlyweightFactory();
export default residentFlyweightFactory;
