(function() {

	Pts.namespace(this);
	var space = new CanvasSpace('#space').setup({
		bgcolor: '#000',
		resize: true,
		retina: true
	});

	let randomIntFromInterval = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	colors = ['#9db4ff', '#aabfff', '#cad8ff', '#fff9f9', '#fff1df', '#ffc690', '#ffbb7b'];
	var form = space.getForm();
	var pts = [];
	const dotsBg = 'rgba(255,255,255,0.7)';
	const dotsBgActive = 'rgba(40,140,251,1)';
	const radius = Math.floor(Math.random() * (150 - 90) + 90);

	var pickArray = function(arr, coord, radius) {
		let arrayCoords = [];

		arr.forEach(function(item) {
			if ((item[0] >= (coord[0] - radius) && item[0] <= (coord[0] + radius)) &&
				(item[1] >= (coord[1] - radius) && item[1] <= (coord[1] + radius))) {
				arrayCoords.push(item);
			}
		})

		return arrayCoords;
	}

	space.add({

		start: (bound, space) => {
			pts = Create.distributeRandom(space.innerBound, 150);
		},

		animate: (time, ftime) => {
			// Display dots
			pts.forEach((p, i) => {
				form.fillOnly(colors[i % colors.length], 1)

				let newX = p[0] + randomIntFromInterval(-20, 20) * 0.01
				let newY = p[1] + randomIntFromInterval(-20, 20) * 0.01
				let newPoints = [newX, newY];
				form.point(p, 2 - 2 * i / pts.length, 'circle');
				pts[i] = newPoints
			})

			let surface = pickArray(pts, space.pointer, radius);
			let curve = Polygon.convexHull(surface);
			curve.insert(curve, curve.lenght)
			form.strokeOnly('rgba(255,255,255,0.5)', 1).line(curve)

			// Lines
			let lines = surface.map((p) => [p, space.pointer]);
			form.strokeOnly('rgba(255,255,255,0.5)', 1).lines(lines);
			form.fillOnly(dotsBgActive).points(surface, 2, 'circle');;
		},

	});

	space.bindMouse().bindTouch().play();

})();