$scope.productImg.forEach(function(item, key) {
    item.imageDetail.forEach(function(item_child, key_child) {
        $scope.addImgDetail = function(elm_child) {
            item.imageDetail.push({
                parent_id: key,
                ukuran: '',
                kuantitas: 0,
                berat: 1000,
            })
        };
        $scope.removeImgDetail = function(elm_child) {
            item.imageDetail.splice(elm_child.$index);
        };
    })
});
$scope.addDetail = function(elm) {
        $scope.productImg.push({
            filename: '',
            color: '',
            imageDetail: [{
                parent_id: elm.$index + 1,
                ukuran: '',
                kuantitas: 0,
                berat: 1000,
            }]
        });
        $scope.addImgDetail = function(elm_child, parent_id) {
            console.log("ID induk", parent_id);
            $scope.productImg[parent_id].imageDetail.push({
                parent_id: parent_id,
                ukuran: '',
                kuantitas: 0,
                berat: 1000,
            });
        };
        $scope.removeImgDetail = function(elm_child,
                parent_id) {
                console.log(parent_id); // $scope.productImg[parent_id].imageDetail.splice(elm_child.$index); }; };
