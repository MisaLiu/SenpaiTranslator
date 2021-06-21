function SenpaiTranslator() {
    function strToBinary(str) {
        var result = [];
        var list = str.split('');
        
        for (var i = 0; i < list.length; i++) {
            if (i != 0) result.push(' ');
            
            var item = list[i];
            var binaryStr = item.charCodeAt().toString(2);
            result.push(binaryStr);
        }
        
        return result.join('');
    }
    
    function binaryToStr(str) {
        var result = [];
        var list = str.split(' ');
        
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var asciiCode = parseInt(item, 2);
            var charValue = String.fromCharCode(asciiCode);
            result.push(charValue);
            
        }
        
        return result.join('');
    }
    
    function getCharCount(char) {
        const charArray = char.split('');
        var obj = {};
        
        if (char.length < 1) return null;
        
        for (var i = 0; i < charArray.length; i++) {
            var key = charArray[i];
            
            if (obj[key])
                obj[key]++;
            else
                obj[key] = 1;
            
        }
        
        return obj;
    }

    return {
        encode: function(toEncodeText) {
            const toEncodeChar = strToBinary(toEncodeText);
            const charCount = getCharCount(toEncodeChar);
            var defaultChar = 0;
            var output = '';
            
            if (!charCount) return null;
            if (charCount['1'] > charCount['0']) defaultChar = 1;
            
            output = toEncodeChar;
            output = output.replace(new RegExp(defaultChar, 'g'), '啊');
            output = output.replace(new RegExp(defaultChar == 1 ? 0 : 1, 'g'), '嗯');
            output = (defaultChar == 1 ? '哼哼哼 ' : '哼哼 ') + output;
            
            return output;
        },
        
        decode: function(toDecodeText) {
            var toDecodeChar = '';
            var defaultChar = 0;
            var output = '';
            
            if (toDecodeText.length < 1) return null;
            if (toDecodeText.substr(0, 4) == '哼哼哼 ') defaultChar = 1;
            
            toDecodeChar = toDecodeText.substr(defaultChar == 1 ? 4 : 3, toDecodeText.length);
            
            output = toDecodeChar.replace(/啊/g, defaultChar.toString());
            output = output.replace(/嗯/g, (defaultChar == 1 ? 0 : 1).toString());
            
            output = binaryToStr(output);
            
            return output;
        }
    };
}