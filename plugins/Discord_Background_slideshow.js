


			
			
			var slideimages = new Array() // create new array to preload images
			slideimages[0] = new Image() // create new instance of image object
			slideimages[0].src = "../Images/HomePage_Slides/s1.jpg" // set image src property to image path, preloading image in the process
			slideimages[1] = new Image()
			slideimages[1].src = "../Images/HomePage_Slides/s2.jpg"
			slideimages[2] = new Image()
			slideimages[2].src = "../Images/HomePage_Slides/s3.jpg"
			slideimages[3] = new Image()
			slideimages[3].src = "../Images/HomePage_Slides/s4.jpg"
			slideimages[4] = new Image()
			slideimages[4].src = "../Images/HomePage_Slides/s5.jpg"

			//Random number generator
			Math.floor(Math.random()*slideimages.length)
			
			//variable that will increment through the images
			var step=0

			function slideit(){
			 //if browser does not support the image object, exit.
			 if (!document.images)
			  return
			 document.getElementById('Slide').src = slideimages[step].src
			 if (step<2)
			  step++
			 else
			  step=0
			 //call function "slideit()" every 2.5 seconds
			 setTimeout("slideit()",2500)
			}

			slideit()