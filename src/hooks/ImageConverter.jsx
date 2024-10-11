export function utf8ToBinary(text) {
    let encoder = new TextEncoder(); // Encode string to UTF-8
    let uint8Array = encoder.encode(text); // Get byte array
    let binary = '';
    uint8Array.forEach(byte => {
        binary += ('00000000' + byte.toString(2)).slice(-8); // Convert each byte to binary
    });
    return binary;
}

// Binary to Base64 conversion
export function binaryToBase64(binary) {
    // Convert binary string to byte array
    const byteArray = binary.match(/.{1,8}/g).map(byte => parseInt(byte, 2)); // Group into 8-bit chunks
    const uint8Array = new Uint8Array(byteArray); // Create Uint8Array
    
    // Convert byte array to a base64-encoded string
    let base64String = '';
    uint8Array.forEach(byte => {
        base64String += String.fromCharCode(byte);
    });
    
    return btoa(base64String); // Convert to base64
}

//use those function to convert from utf_8 to base64 and finish with the next steps to use it

//example of a base64 image 
//const Base64Value = "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";

//const imageSrc = `data:image/png;base64,${Base64Value}`; 

// <img src={imageSrc} alt="Base64 encoded" />  