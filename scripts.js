function copy_test() {
  navigator.clipboard.readText()
    .then(text => {
      var col_no = document.getElementById('col_no').value;
      var table_name = document.getElementById('table_name').value;
      console.log('\n text is :\n\n', col_no);
      makeSqlSyntax(col_no,text,table_name);
      // `text` contains the text read from the clipboard
    })
    .catch(err => {
      // maybe user didn't grant access to read from clipboard
      console.log('Something went wrong', err);
    });
}

function makeSqlSyntax(col_no,text,table_name) {
  var outstring="";
//  var element=[];

  // var split_text = text.split("\n\n");
  // console.log('\n text is :\n\n', split_text);
  // console.log('\n After processing :\n\n');
  // split_text.forEach(function(item,index,array) {
  //      if (item.startsWith("\n")){
  //          element.push("");
  //          element.push(item.slice(1));
  //        }
  //      else
  //          element.push(item);
  // });

  var split_text = text.split(/[ ,\n\t]+/);
  console.log('\n text is :\n\n', split_text);
  var item=0;

  for (i=1;i<=(split_text.length)/col_no;i++)
    {   console.log('\n loop :\n\n', i);

      outstring = outstring + "insert into "+ table_name+" values (";
      for(;item<(i*col_no) ;item++){
        if (isNaN(split_text[item])){
          outstring =outstring + "\""+split_text[item]+"\"";
        }
        else{
            outstring = outstring + split_text[item];
        }
        if (item!=(i*col_no)-1){
           outstring = outstring + ",";
        }
      }
      outstring = outstring + ");\n"
    }
  console.log("\n\n SQL Queries \n\n",outstring);
  document.getElementById("sql_out").value = outstring;
}
