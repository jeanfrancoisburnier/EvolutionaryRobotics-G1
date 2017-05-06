{
    // here we define a variable for record keeping
    //velocities: [],
    //deltaVelocities: [],
    minIrVals: [],
    fitnesses: [],

    setupSimulation: function() {
        //this.velocities = [];
        //this.deltaVelocities = [];
        this.minIrVals = [];
        return true;
    },

    // optional function called after each step of simulation
    afterSimulationStep: function() {
        var sensors = this.getRobot().getSensors();
        var minIr = 50

        for (var i = 0; i < sensors.length; i++) {
            if (sensors[i].getType() == 'IrSensor') {
                if (sensors[i].read() < minIr && sensors[i].read() > 0)
                    minIr = sensors[i].read();
            }

        }


        this.minIrVals.push(minIr);

        return true;
    },

    // optional function called at the end of the simulation
    endSimulation: function() {
        var sum = 0;
        for (var i = 0; i < this.minIrVals.length; i++) {
            sum += this.minIrVals[i]
        }

        if (sum != 0) {
            this.fitnesses.push(100 / sum);
            return true;
        }
        this.fitnesses.push(0)
        return true;
    },
    // the one required method... return the fitness!
    getFitness: function() {
        var fitness = this.fitnesses[0];
        for (var i = 1; i < this.fitnesses.length; i++) {
            if (this.fitnesses[i] < fitness)
                fitness = this.fitnesses[i];
        }
        return fitness;
    },

}
