export default function getValueForNestedBracket(st, obj) {
    return st.replace(/\[([^\]]+)]/g, '.$1').split('.').reduce(function(o, p) { 
        return o[p];
    }, obj);
}

