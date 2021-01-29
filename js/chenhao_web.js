$(document).ready(function () {
    getType();

    $("#confirm").click(function () {
        $("#datalist").empty();
        $("#cu_price_rate").val("");
        $("#plastic_price_rate").val("");
        show_table(0, 0);
    });

    //计算按键的操作
    $("#calculate").click(function () {
        calculate();
    });

    //回车触发计算
    $("#cu_price_rate").keydown(function(e){
        if(e.keyCode == 13){
            calculate();
        }
    });

    //回车触发计算
    $("#plastic_price_rate").keydown(function(e){
        if(e.keyCode == 13){
            calculate();
        }
    });

    function calculate() {
        $("#datalist").empty();
        let cu_price_rate = $("#cu_price_rate").val();
        let plastic_price_rate = $("#plastic_price_rate").val();
        show_table(cu_price_rate, plastic_price_rate);
    }

    function getType() {
        let types = [
            "RVV",
            "RVVP",
            "RVV22",
            "RVVP22",
            "RVVP2-22",

            "N-RVV",
            "N-RVVP",
            "N-RVV22",
            "N-RVVP22",
            "N-RVVP2-22",

            "KVV",
            "KVVP",
            "KVV22",
            "KVVP22",
            "KVVP2",
            "KVVP2-22",

            "N-KVV",
            "N-KVVP",
            "N-KVV22",
            "N-KVVP2",
            "N-KVVP22",
            "N-KVVP2-22",

            "RVS",
            "N-RVS",

            "RVSP",
            "N-RVSP",

            "BVVB",
            "N-BVVB",
            "BLVVB",

            "RV",
            "N-RV",

            "BV",
            "N-BV",
            "BVR",
            "N-BVR",

            "BLV",
            "N-BLV",

            "KVVR",
            "KVVR22",
            "H-KVVR22",
        ];
        types.forEach(function (item, index) {
            let option = "<option value=" + index + ">" + item + "</option>";
            $("#type_select_query").append(option)
        })
    }

    function show_table(cu_price_rate, plastic_price_rate) {
        let type = $("#type_select_query option:selected").text();
        //type = type.toLowerCase();
        if(type != "选择型号"){
            $.getJSON("./json/" + type + ".json", function (data) {
                $.each(data, function (i, item) {
                    $.each(item, function (j, i_item) {
                        let specs = i_item["specs"];
                        let cu_weight = parseFloat(i_item["cu_weight"]);
                        let plastic_weight = parseFloat(i_item["plastic_weight"]);
                        let cu_price, plastic_price;
                        if(cu_price_rate == 0){
                            cu_price = parseFloat(i_item["cu_price"]);
                        }else {
                            cu_price = cu_weight * cu_price_rate;
                        }
                        if(plastic_price_rate == 0){
                            plastic_price = parseFloat(i_item["plastic_price"]);
                        }else {
                            plastic_price = plastic_weight * plastic_price_rate;
                        }
                        let other_price = parseFloat(i_item["other_price"]);
                        let final_cost = cu_price + plastic_price + other_price;
                        let td_unit = "<tr><td>" +
                            specs + "</td><td>" +
                            cu_weight.toFixed(2) + "</td><td>" +
                            cu_price.toFixed(2) + "</td><td>" +
                            plastic_weight.toFixed(2) + "</td><td>" +
                            plastic_price.toFixed(2) + "</td><td>" +
                            other_price.toFixed(2) + "</td><td>" +
                            final_cost.toFixed(1) + "</td></tr>";
                        $("#datalist").append(td_unit);
                    });
                })
            });
        }

    }
});