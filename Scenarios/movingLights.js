{ // here we define a variable for record keeping
    fitnesses: [],
    setupSimulation: function() {
        this.lightVals = [];
        this.startPos = this.getRobot().getCoreComponent().getRootPosition();
        var lightSources = this.getEnvironment().getLightSources();
		this.lightSourcePos = lightSources[0].getPosition();
        return true;
    },

    afterSimulationStep: function() {
        var lightSource = this.getEnvironment().getLightSources();
        for (var i = 0; i < lightSource.length; i++){
            if (lightSource[i].getIntensity() == 1.0){
                var pos = this.getRobot().getCoreComponent().getRootPosition();
                var lightPos = lightSource[i];
                var xDiff = (pos.x - lightPos.x);
        		var yDiff = (pos.y - lightPos.y);
                var dist = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
                if (dist < 0.1 && i < (lightSources.length - 1)){
                    lightSources[i].setIntensity(0.0);
                    lightSources[i++].setIntensity(1.0);
                }
            }
        }
        var light = 0;
        var sensors = this.getRobot().getSensors();

        for (var i = 0; i < sensors.length; i++)
        {
            if (/^EyeC/.test(sensors[i].getLabel()))
            {
                light += sensors[i].read();
            }
        }

        this.lightVals.push(light);

        return true;
    },

    endSimulation: function() {
        var currentPos = this.getRobot().getCoreComponent().getRootPosition();
        var xDiff = (currentPos.x - this.lightSourcePos.x);
        var yDiff = (currentPos.y - this.lightSourcePos.y);
        var sum = 0;

        this.distance = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
        console.log("Distance: "+this.distance);

        // Something needs to be done with the Height here...

        for (var i = 0; i < this.lightVals.length; i++)
        {
            sum += this.lightVals[i];
        }

        this.fitnesses.push(sum);

        return true;
    },


    getFitness: function() {
        var fitness = this.fitnesses[0];
        for (var i = 1; i < this.fitnesses.length; i++) {
            if (this.fitnesses[i] < fitness)
                fitness = this.fitnesses[i];
        }
        return fitness;
    }
}
