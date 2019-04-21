function addCategory($millerCol,data){
    // also send an ajax request to add/update the values
    // below code is for UI purpose only
    var categoryItem = new CategoryItem();
    categoryItem.setItemName("Category Added");
    categoryItem.setCategoryId(data.categoryId);
    categoryItem.setParentId(data.parentId);
    categoryItem.setHasChildren(false);
    categoryItem.setIsDeletable(false);
    $millerCol.millerColumn("addItem", categoryItem);
    $("#popup").remove();
}

function editCategory($millerCol,data){
    // also send an ajax request to add/update the values
    // below code is for UI purpose only
    data.categoryName = "Edited Category";
    $millerCol.millerColumn("updateCategory", data);
}

function editItem($millerCol,data){
    // also send an ajax request to add/update the values
    // below code is for UI purpose only
    data.itemName = "New Item";
    $millerCol.millerColumn("updateItem", data);
}

function showSpinner(){
    var spinner = $("<div/>").append($("<div/>").addClass("spinner"));
    spinner.addClass("spinner-wrapper");
    $("body").append(spinner);
}

function hideSpinner(){
    $(".spinner-wrapper").remove();
}

function initializeMillerCol($millerCol){
    $millerCol.empty();
    showSpinner();
    setTimeout(function () {
        hideSpinner();
        $millerCol.millerColumn({
            isReadOnly: false,
            initData: {
                "categoryId":"p",
                "categoryName":"Problem",
                "parentId":"problemParent",
                "isLowestLevel":false,
                "hasChildren":true,
                "items":[
                    {
                        "itemId":"p1",
                        "isDeleteable":true,
                        "itemName":"Problem 1",
                        "hasChildren":true,
                        "categoryId":"p",
                        "parentId":"problemParentItems",
                        "childCategory":{

                            "categoryId":"probcat1",
                            "categoryName":"Goal",
                            "parentId":"problemParent",
                            "isLowestLevel":false,
                            "items": [
                                {
                                    "itemId":"g1",
                                    "isDeleteable":true,
                                    "itemName":"Goal 1",
                                    "hasChildren":true,
                                    "categoryId":"probcat1",
                                    "parentId":"p1",
                                    "childCategory": {

                                        "categoryId":"gcat",
                                        "categoryName":"Intervention",
                                        "parentId":"g1",
                                        "isLowestLevel":true,
                                        "items": [
                                            {
                                                "itemId":"952f7152-3710-11e8-b107-a321e1bca773",
                                                "isDeleteable":true,
                                                "itemName":"Intervention 1",
                                                "hasChildren":false,
                                                "categoryId":"gcat",
                                                "parentId":"g1",
                                                "isLowestLevel":true
                                            }
                                        ]

                                    }
                                },
                                {
                                    "itemId":"72942b44-d011-1530-26b0-99993351209e",
                                    "isDeleteable":true,
                                    "itemName":"Goal 2",
                                    "hasChildren":true,
                                    "categoryId":"probcat1",
                                    "parentId":"p1"
                                }
                            ]
                        }
                    },
                    {
                        "itemId":"p2",
                        "isDeleteable":true,
                        "itemName":"Problem 2",
                        "hasChildren":false,
                        "categoryId":"p",
                        "parentId":"problemParentItems"
                    }
                ]
            }
        });
    }, 100);
}

(function ($) {
    $(document).ready(function () {
        var $millerCol = $("#category-miller-cols-container");
        initializeMillerCol($millerCol)

        $millerCol.on("item-selected", ".miller-col-list-item", function (event, data) {
            console.log("item selected.. data: " + data.itemId);
        });

        $millerCol.on("add-item", ".miller-col-container", function (event, data) {
            $.fancybox.open({
                type:'html',
                src:'<p>This is where the corresponding value will be added</p>',
                afterClose:function(){
                    addCategory($millerCol,data)
                }
            })
        });

        $millerCol.on("edit-column-title", ".miller-col-container", function (event, data) {

            $.fancybox.open({
                type:'html',
                src:'<p>This is where the corresponding value will be edited</p>',
                afterClose:function(){
                    editCategory($millerCol,data)
                    // initializeMillerCol($millerCol)
                }
            })
        });

        $millerCol.on("delete-item", ".miller-col-list-item", function (event, data) {
            //columns will be reinitialized after deletion.
            $.fancybox.open({
                type:'html',
                src:'<p>This is where the corresponding value will be deleted</p>',
                afterClose:function(){
                    initializeMillerCol($millerCol)
                }
            })
        });

        $millerCol.on("edit-item", ".miller-col-list-item", function (event, data) {
            $.fancybox.open({
                type:'html',
                src:'<p>This is where the corresponding value will be edited</p>',
                afterClose:function(){
                    editItem($millerCol,data)
                }
            })
        });
    });

})(jQuery);
