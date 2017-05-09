{
    // here we define a variable for record keeping

    setupSimulation: function()
    {
		this.fitnesses = [];
		this.timeSteps = 0.0;
		var lightSources = this.getEnvironment().getLightSources();
    	this.lightPos = lightSources[0].getPosition();
		this.startPos = this.getRobot().getCoreComponent().getRootPosition();
		this.angle = 0;
		this.distance = 0;
		return true;
    },

    afterSimulationStep: function()
    {	
    	var corePos = this.getRobot().getCoreComponent().getRootPosition();
    	var bodyParts = this.getRobot().getBodyParts();
    	var bodyPartPos = bodyParts[7].getRootPosition();

        var diffRobX = bodyPartPos.x-corePos.x;
        var diffRobY = bodyPartPos.y-corePos.y;
		
		// With initial position
		// var diffLineX = this.lightPos.x-this.startPos.x;
		// var diffLineY = this.lightPos.y-this.startPos.y;

		// With current position
		var diffLineX = this.lightPos.x-corePos.x;
		var diffLineY = this.lightPos.y-corePos.y;

    	var yaw = Math.atan2(diffRobY,diffRobX);
		var theta_l =  Math.atan2(diffLineY,diffLineX);
		var theta = Math.abs(yaw-theta_l);
		

    	// console.log("Yaw: "+yaw*180.0/Math.PI);
		// console.log("Theta_l: "+theta_l*180.0/Math.PI);
		// console.log("Theta: "+theta*180.0/Math.PI);
		
		// Normalize
		theta /=(Math.PI);
		this.angle += theta;
		this.distance += Math.sqrt(Math.pow(diffLineX,2) + Math.pow(diffLineY,2));
		
		this.timeSteps += 1.0;
		
		return true;
    },

    // optional function called at the end of the simulation
    endSimulation: function()
    {
		var x_a = this.angle/this.timeSteps;
		var c_a = -0.01;
		var b_a = Math.log((c_a-1)/c_a);
		var a_a = 1-c_a;

		var x_d = 10*this.distance/this.timeSteps; // 10* -> Transform into decimeters
		var b_d = b_a; // To have approximatelly same weights -> we have 0.6 for 1cm distance
		
		var fit_angle 	 = a_a*Math.exp(-b_a*x_a)+c_a;
		var fit_distance = Math.exp(-b_d*x_d);

		var fitness = fit_angle + fit_distance;
		
		this.fitnesses.push(fitness);
		return true;
    },

    // the one required method... return the fitness!
    getFitness: function()
    {
		var fitness = this.fitnesses[0];
		for (var i= 1; i < this.fitnesses.length; i++)
		{
			if (this.fitnesses[i] < fitness)
				fitness = this.fitnesses[i];
		}
		return fitness;
    },

}
