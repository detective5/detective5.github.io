app.controller("MainCtrl", function ($scope) {

})
app.controller("ContactController", function ($scope, $http, $location) {
 
    $scope.submitOnclick = function () {
        $.ajax({
            url: "//formspree.io/johnxmai@gmailcom",
            method: "POST",
            data: { message: "hello!" },
            dataType: "json"
        });
        //$http.post("http://formspree.io/johnxmai@gmailcom", { Title: this.formInfo.Title, message: this.formInfo.Message, email: this.formInfo.Email }).
        //success(function (data, status, headers, config) {
        //    $location.path("/Thanks");
        //}).
        //error(function (data, status, headers, config) {
        //    alert("error");
        //});
    }
    function callback(result) {
        
    }
})
.controller("FaceLockController", function ($scope, $http, $location) {
    /********************************global data******************************************************/
    var apiKey = "115aac29ab0e173b86bf4abadf7032ad",
        apiSecret = "WbI2jFXZ_ULHECUlmkVdscpKP3B-4dhc";
    var apiUrl = "http://apius.faceplusplus.com/";
    var secretKey = "api_key=" + apiKey + "&api_secret=" + apiSecret;
    var localstream, video;
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d");
    /*************************************************************************************************/
    var hi;
    function errBack(error) {
        console.log("Video capture error: ", error.code);
    }
    function Detect() {

        var uri = apiUrl + "detection/detect?" + secretKey;
        var dataURL = canvas.toDataURL("image/jpg");
        var blob = dataURItoBlob(dataURL);
        var newData = { img: blob };
        var formData = new FormData;
        for (e in newData) "_" !== e[0] && formData.append(e, newData[e]);

        myRequest = new XMLHttpRequest, myRequest.open("POST", uri, !0);
        myRequest.withCredentials = true;
        myRequest.onload = function () {
            var a;
            myRequest.onload = null;
            clearTimeout(timeOut);
            try {
                a = JSON.parse(myRequest.responseText)
            } catch (e) {
                a = {}
            }
            myRequest.DONE;
            if (a.face.length != 0) {
                //alert("face detected");
                document.getElementById("userText").color = "blue";
                document.getElementById("userText").innerHTML = "Face detected"
                DrawComponent(a);
                FacePP.SetFaceID(a.face[0].face_id);

            }
            else {
                alert("no face detected");
                document.getElementById("userText").color = "red";
                document.getElementById("userText").innerHTML = "No face detected"
                FacePP.SetFaceID("");
            }
            return 200 === myRequest.status ? myRequest.promise : alert("failed")
        };
        timeOut = setTimeout(function () {
            myRequest.abort();
        }, 1E4);
        myRequest.send(formData);
    }
    function dataURItoBlob(c) {
        var b, a, p, h, e;
        p = c.split(",")[0].split(":")[1].split(";")[0];
        b = atob(c.split(",")[1]);
        c = [];
        a = h = 0;
        for (e = b.length; 0 <= e ? h < e : h > e; a = 0 <= e ? ++h : --h) c.push(b.charCodeAt(a));
        return new Blob([new Uint8Array(c)], {
            type: p
        })
    }
    function DrawComponent(frame) {
        var width = canvas.width;
        var height = canvas.height;

        context.fillStyle = "#0FFFF0";
        //draw eyes
        context.beginPath();
        context.arc(width * (frame.face[0].position.eye_left.x / 100), height * (frame.face[0].position.eye_left.y / 100), 3, 0, 2 * Math.PI);
        context.arc(width * (frame.face[0].position.eye_right.x / 100), height * (frame.face[0].position.eye_right.y / 100), 3, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        //draw nose
        context.beginPath();
        context.arc(width * (frame.face[0].position.nose.x / 100), height * (frame.face[0].position.nose.y / 100), 3, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        //draw mouth
        context.beginPath();
        context.arc(width * (frame.face[0].position.mouth_left.x / 100), height * (frame.face[0].position.mouth_left.y / 100), 3, 0, 2 * Math.PI);
        context.arc(width * (frame.face[0].position.mouth_right.x / 100), height * (frame.face[0].position.mouth_right.y / 100), 3, 0, 2 * Math.PI);
        context.closePath();
        context.fill();

        var centerX = width * (frame.face[0].position.center.x / 100);
        var centerY = height * (frame.face[0].position.center.y / 100);
        //draw center
        //context.beginPath();
        //context.arc(centerX, centerY, 3, 0, 2 * Math.PI);
        //context.closePath();
        //context.fill();

        var faceFrameWidth = width * (frame.face[0].position.width / 100);
        var faceFrameHeight = height * (frame.face[0].position.height / 100);

        //draw face frame
        context.beginPath();
        context.strokeStyle = "#0FFFF0";
        context.rect(centerX - (faceFrameWidth / 2), centerY - (faceFrameHeight / 2), faceFrameWidth, faceFrameHeight);
        context.closePath();
        context.stroke();
    }

    function CreateFaceset() {
        FacePP.CreateFaceset();
    }
    var FacePP = (function () {
        var faceID, personID, fasesetID;
        return {
            SetFaceID: function (id) {
                faceID = id;
            },
            CreatePerson: function (name, tag) {
                if (faceID != "" && faceID != null) {
                    var param = { person_name: name, face_id: faceID, tag: tag };
                    var uri = apiUrl + "person/create?" + secretKey;
                    $.ajax({
                        type: "POST",
                        url: uri,
                        data: param,
                        success: function (e) {
                            personID = e.person_id;
                            alert("person created");
                        },
                        error: function (e) {
                            alert("failed");
                        }
                    })
                }
            },
            PersonAddFaces: function (name) {
                var param = { person_name: name, face_id: faceID };
                var uri = apiUrl + "person/add_face?" + secretKey;
                $.ajax({
                    type: "POST",
                    url: uri,
                    data: param,
                    success: function (e) {
                        alert(e.added + " face(s) added");
                    },
                    error: function (e) {
                        alert("failed");
                    }
                });
            },
            PersonGetInfo: function (name) {
                var uri = apiUrl + "person/get_info?" + secretKey + "&person_name=" + name;
                $.ajax({
                    type: "GET",
                    url: uri,
                    success: function (e) {
                        personID = e.person_id;
                    },
                    error: function (e) {
                        alert("failed");
                    }
                });
            },
            Verify: function (name) {
                var param = { person_name: name, face_id: faceID };
                var uri = apiUrl + "recognition/verify?" + secretKey;
                $.ajax({
                    type: "POST",
                    url: uri,
                    data: param,
                    success: function (e) {
                        alert("Same person: " + e.is_same_person + ", Confidence: " + e.confidence);
                    },
                    error: function (e) {
                        alert("failed");
                    }
                });
            },
            TrainPerson: function (name) {
                var uri = apiUrl + "train/verify?" + secretKey;
                $.ajax({
                    type: "POST",
                    url: uri,
                    data: { person_name: name },
                    success: function (e) {
                        alert("person trained");
                    },
                    error: function (a) {
                        alert("failed");
                    }
                })
            },
            CreateFaceset: function (name) {
                var uri = apiUrl + "faceset/create?" + secretKey;
                var param = { faceset_name: name, face_id: faceID };
                $.ajax({
                    type: "POST",
                    url: uri,
                    data: param,
                    success: function (e) {
                        fasesetID = e.faceset_id;
                        alert("faceset created");
                    },
                    error: function (a) {
                        alert("failed");
                    }
                })
            }

        }
    })();
    $scope.CameraPopup = function () {
        var parent = document.getElementById("faces-container");

        // Grab elements, create settings, etc.
        if (document.getElementById("video") === null) {

            video = document.createElement('video');
            video.autoPlay = true;
            video.id = "video";
            video.width = "500";
            video.height = "500";

            parent.appendChild(video);
        }
        // Put video listeners into place
        if (navigator.getUserMedia) { // Standard
            navigator.getUserMedia({ video: true }, function (stream) {
                localstream = stream;
                video.src = stream;
                video.play();
            }, errBack);
        } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia({ video: true }, function (stream) {
                localstream = stream;
                var URL = window.URL || window.webkitURL;
                video.src = URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
        else if (navigator.mozGetUserMedia) { // Firefox-prefixed
            navigator.mozGetUserMedia({ video: true }, function (stream) {
                localstream = stream;
                var URL = window.URL || window.webkitURL;
                video.src = URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }

    }
    $scope.CameraPopupClose = function () {
        var parent = document.getElementById("faces-container");
        var child = document.getElementById("video");
        if (child != null) {
            video.pause();
            video.src = "";
            if (localstream != undefined) {
                localstream.stop();
            }
            parent.removeChild(child);
        }
    }
    $scope.Capture = function () {
        var parent = document.getElementById("faces-container");
        var child = document.getElementById("video");
        if (child != null && localstream != undefined) {
            if (localstream != undefined) {
                context.drawImage(video, 0, 0, 500, 500);
                var track = localstream.getTracks()[0];
                track.stop();
                //localstream.stop();
            }
            video.pause();
            video.src = "";
            parent.removeChild(child);
            $('#cameraPopup').modal('hide')
            //window.location.href = "#";
            Detect();
        }
        else {
            alert("Browser needed permission to turn on camera");
        }
    }
    $scope.Create = function () {
        if (document.getElementById("personName").value != "") {
            if (confirm("Create person: " + document.getElementById("personName").value + "?")) {
                FacePP.CreatePerson(document.getElementById("personName").value, "");
            }
        }
    }
    $scope.Train = function () {
        FacePP.TrainPerson(document.getElementById("personName").value);
    }
    $scope.Vertify = function () {
        FacePP.Verify(document.getElementById("personName").value);
    }
    $scope.GetInfo = function () {
        FacePP.PersonGetInfo(document.getElementById("personName").value);
    }
    $scope.AddFace = function () {
        FacePP.PersonAddFaces(document.getElementById("personName").value);
    }

});

