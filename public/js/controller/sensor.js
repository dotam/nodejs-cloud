function format(row, tr) {
    var abc;
    $.ajax({
        url: '/sensor-detail',
        success: function(resutl) {
            row.child(resutl).show();
            tr.addClass('shown');
        }
    });
};


$(document).ready(function() {
    var tenantID;
    $("#filterTenant").click(function() {
        tenantID = document.getElementById("filterTenant").selectedIndex;
        console.log(document.getElementsByTagName("option")[x].value);
    });
    var table = $('#sensor').DataTable({

        "ajax": "/api/getSensorByTenantID/" + tenantID,
        "columns": [{
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            }, {
                "render": function(data, type, row) {
                    return '<img src="./images/h2s.png" width="50px" height="50px"/>'
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

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            format(row, tr)
        }
    });
});