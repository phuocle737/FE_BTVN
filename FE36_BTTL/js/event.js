import {getElement, isEmpty} from "/js/common.js";
import URL from "/js/constant.js";

getElement('btnDemoModule').addEventListener('click', function(){
    if (!isEmpty(this.id)) {
        location.href = URL;
    }
});