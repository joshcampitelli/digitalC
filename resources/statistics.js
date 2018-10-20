var list = []
var commitment_list = []
var entities_list = []
var partners_list = []

var process_results_called = false
function create_top_cube(app, dim1, measurement, my_callback) {
    var hyperCubeDef = {
        qDimensions: [
          {
              qDef: { qFieldDefs: [dim1] }
          }
        ],
        qMeasures: [
        {
            qDef: { qDef: '=count([' + measurement + '])' },
            qSortBy: { qSortByNumeric: -1}
        }
        ],
        qInterColumnSortOrder: [1, 0],
        qInitialDataFetch: [
        {
            qTop: 0,
            qLeft: 0,
            qHeight: 2000,
            qWidth: 2
        }
        ]
    }

    var first, second, third
    app.createCube(hyperCubeDef, hypercube => {
        let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix
            matrix.forEach((row, index) => {
                if (first == null) {
                    process_results_called = false
                    first = row
                    list.push(row)
                } else if (second == null) {
                    second = row
                    list.push(row)
                } else if (third == null) {
                    third = row
                    list.push(row)
                } else if (process_results_called != true){
                    process_results_called = true
                    my_callback(list)
                    list = []
                    return
                }
            })
    })
}

function process_results(list) {
  console.log(list)
}

function get_top_commitments(app) {
    commitment_list = create_top_cube(app, "Commitment Title", "Partners", process_results)
    partners_list = create_top_cube(app, "Country", "Partners", process_results)
    entities_list = create_top_cube(app, "Partners", "Lead entity", process_results)
}