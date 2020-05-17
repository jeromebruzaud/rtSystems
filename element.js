class Element {
    constructor(name) {
        this.name = name;
    }
}

class SystemElement extends Element {
    constructor(name, resource=undefined) {
        super(name);
        this.resources = resource;
    }
}

class Planet extends SystemElement {
    constructor(name, resource){
        super(name, resource);
    }
}

class AsteroidBelt extends SystemElement {
    constructor(name) {
        super(name, /*1d5*/);
        this.effect = ""/*p14*/;
    }
}

class AsteroidCluster extends SystemElement {
    constructor(name) {
        super(name, /*1d5*/);
        this.effect = ""/*p14*/;
    }
}

class DerelictStation extends SystemElement {
    constructor(name, resource, effect, origins, armor, hull) {
        super(name, /*1d5*/);
        this.effect = ""/*p14*/;
        this.origins = origins;
        this.armor = armor;
        this.hull = hull;
    }
}


