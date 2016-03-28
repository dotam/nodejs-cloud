function format() {

    $.ajax({
        url: "js/controller/data.txt",
        success: function(result) {
            alert(result);
        }
    })
}

$(document).ready(function() {
    var table = $('#sensor').DataTable({

        "ajax": "/api/getAllSensor",
        "columns": [{
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            }, {
                "render": function(data, type, row) {
                    return '<img src="./images/gateway.png" width="50px" height="50px"/>'
                }
            },
            { "data": "macAddress" },
            { "data": "sensorType" },
            { "data": "ip" },
            { "data": "user" },
            { "data": "group" },
            { "data": "tenant" }

        ]
    });

    $('#sensor tbody').on('click', 'td.details-control', function() {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        console.log(row);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format()).show();
            tr.addClass('shown');
        }
    });
});