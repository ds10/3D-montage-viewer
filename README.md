# 3D-montage-viewer
3D montage viewer

## Creating HTML 360 degree views of subjects from movies using Matlab

This document describes how to create an interactive html 360 degree view from a movie of a rotating subject using Matlab. It uses the VideoTo360montage.mlx Matlab script and the view360Montage.js file both of which are provided with this document.

## Setup

*	Open Matlab and select the folder containing the VideoTo360montage.mlx file in the Current Folder panel on the left side.
*	Open the VideoTo360montage.mlx file. You can do this by double clicking the file in the Current Folder panel. The Live Editor window will open and show the script.
*	In the Paths and filenames section:
	* Enter the path to the folder containing the video
	* Enter the video file name and extension (separately)
	* Enter the path to an output folder

## Enter parameters

*	Enter the first and last frame numbers for a full 360 degree rotation of the subject.
*	Decide how many frames you require in the html view. More frames will result in smoother motion but will result in a larger file. Somewhere in the region of 30 frames is fine.
*	The 360 image is saved as a bitmap montage of video frames. Enter the montage width and height. For example, a width of 4 and a height of 8 for an html view consisting of 32 frames.
*	Enter cropping values as a percentage of the frame width and height. Set these to zero if cropping is not required.
*	Enter the scale. A value of 1 means that each individual frame in the montage will have the same number of pixels as the cropped area from the movie. If you have a high definition movie (recommended) then this will result in a very large montage file. Use a value of less than one to reduce the size of the file. A scale value which results in a 30 Megapixel montage seems to work fine.
*	Enter a rotation value if you need to rotate the image. 0 = no frame rotation,  1 = 90 anticlockwise,  2 = 180,  3 = 90 clockwise
*	If the 360 html view rotates the wrong way then you can fix this by setting reverse to true
*	Set the jpg quality to a lower value if you need to reduce the file size. You may want to do this when…
	* …increasing the number of frames to get a smoother rotation.
	* …increasing the scale to get higher resolution
*	Set colour balance to true if you need to change it and enter the RGB value of an area in the movie which should render as grey.

## Run the script

*	Click Run in Matlab and the HTML viewer files will be generated in a folder having the same name as the movie file. This folder will be in the output path you specified earlier.
*	You should be able to preview the file in your browser by opening the html file.
*	An extra .params.txt file is also generated. This file is not used by the viewer and may be deleted. You may wish to keep it because it is a useful record of the parameters used to generate the montage image from the video file.
