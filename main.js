$(document).ready(function () {
    
    $('nav ul li').click(function(){
       
        $('nav ul li').css({'background-color':'transparent',
                                      'color':'white'
                                     })
        $('this').css({'background-color':'red',
                                      'color':'white'
                                     })
        
    })

    $.ajax({
        url: `https://api.thedogapi.com/v1/images/search?limit=1&mime_types=jpg,png`,
        success: function (data) {
            console.log(data)
            $('.one img').attr('src', data[0].url);

            $('.one .text').html(data[0].breeds.length != 0 ? data[0].breeds[0].name : '');


        }
    })

    $.ajax({
        url: `https://api.thecatapi.com/v1/images/search?limit=1`,
        success: function (data) {
            console.log(data)
            $('.four img').attr('src', data[0].url);

            $('.four .text').html(data[0].breeds.length != 0 ? data[0].breeds[0].name : '');


        }
    })
    
    $('.dogBreed li:nth-child(1)').css({'background-color':'darkblue',
                                      'color':'white'
                                     })
    
    searchDogBreed('A')
    
 $('.catBreed li:nth-child(1)').css({'background-color':'darkblue',
                                      'color':'white'
                                     })
    searchCatBreed('A')

   
        $('#dogGallery').empty();
        $.ajax({
            headers: {
                'x-api-key': 'bc240bc1-fb69-4b68-b3ba-4a61d196dcaa'
            },
            url: `https://api.thedogapi.com/v1/images/search?limit=100`,
            success: function (response) {
                console.log(response)
                for (var i = 0; i < response.length; i++) {
                    const img = $('<img style="100%;">')
                    img.attr('src', response[i].url);
                    console.log(response[i].url);

                    $('#dogGallery').append(img);



                }

            }
        })

       


    $('#dogGalleryBtn').click(function () {
        $('#dogGallery').empty();
        $.ajax({
            
            url: `https://api.thedogapi.com/v1/images/search?limit=100`,
            success: function (response) {
                console.log(response)
                for (var i = 0; i < response.length; i++) {
                    const img = $('<img style="100%;">')
                    img.attr('src', response[i].url);
                    console.log(response[i].url);

                    $('#dogGallery').append(img);



                }

            }
        })

    })


    
        $('#catGallery').empty();
        
        $.ajax({
            
            url: `https://api.thecatapi.com/v1/images/search?limit=100`,
            success: function (response) {
                console.log(response)
                for (var i = 0; i < response.length; i++) {
                    const img = $('<img style="100%;">')
                    img.attr('src', response[i].url);
                    console.log(response[i].url);

                    $('#catGallery').append(img);



                }

            },
            error: function(){
            alert('fail');
        }
        })

    


    $('#catGalleryBtn').click(function () {
        $('#catGallery').empty();
        $.ajax({
            headers: {
                'x-api-key': 'bc240bc1-fb69-4b68-b3ba-4a61d196dcaa'
            },
            url: `https://api.thecatapi.com/v1/images/search?limit=100`,
            success: function (response) {
                console.log(response)
                for (var i = 0; i < response.length; i++) {
                    const img = $('<img style="100%;">')
                    img.attr('src', response[i].url);
                    console.log(response[i].url);

                    $('#catGallery').append(img);



                }

            }
        })

    })


    
    
    $('.dogBreed li').click(function () {

$('.dogBreed li').css('background-color','dodgerblue')
$('.dogBreed li').css('color','black')
        $(this).css('background-color','darkblue')
        $(this).css('color','white')
        

        $('#dogBreedContainer').empty();
        search = $(this).html();
        searchDogBreed(search)
        
    })
    
    $('#dogButton').click(function () {
        $('#dogBreedContainer').empty();
        const dogText = $('#dogSearch').val();
        $.ajax({
            url: `https://api.thedogapi.com/v1/breeds/search?q=${dogText}`,
            success: function (data){
                console.log(data)
                
                if(data.length > 1 || data != undefined){
                    for (let x = 0; x < data.length; x++){
                    $.ajax({
                        url: `https://api.thedogapi.com/v1/images/search?breed_id=${data[x].id}`,
                        success: function (response) {
                            for (let i = 0; i < response.length; i++){
                                        const searchContent = $('<div class="searchContent" style="margin-bottom:30px;">')
                                        const img = $('<img style="width:100%;">')
                                        const ul = $('<ul>')                                     
                                       
                                        img.attr('src', response[i].url);
                                        console.log(response[i].url);
                                        console.log(response[i].breeds[0].name);

                                        searchContent.append(img);
                                        ul.append(`
                                        <li><strong>Breed name:</strong> ${response[i].breeds[0].name}<br>
                                        <li><strong>Breed group:</strong> ${response[i].breeds[0].breed_group}<br>
                                        <li><strong>Bred for:</strong> ${response[i].breeds[0].bred_for}<br>
                                        <li><strong>Life span:</strong> ${response[i].breeds[0].life_span}<br>
                                        <li><strong>Height:</strong> ${response[i].breeds[0].height.metric} in<br>
                                        <li><strong>Weight:</strong> ${response[i].breeds[0].weight.metric} kg<br>
                                        <li><strong>Characteristics:</strong> ${response[i].breeds[0].temperament}

                                    `)
                                        searchContent.append(ul);
                                        $('#dogBreedContainer').append(searchContent);
                            }
                        }
                        
                    })//inner ajax
                }//for
                }
                else{
                   /* $('#dogBreedContainer').html('NO RECORDS FOUND');*/
                    alert('no record')
                }
                
                
            }//outer success
            
        })//outer ajax
        
    })//click function


    
    
    $('.catBreed li').click(function () {
        $('.catBreed li').css({'background-color':'dodgerblue',
                              'color':'black'
                              })

        $(this).css({'background-color':'darkblue',
                    'color':'white'
                    })
       
        $('#catBreedContainer').empty();
        search = $(this).html();
        searchCatBreed(search)
       
    })
    
    $('#catButton').click(function () {
        $('#catBreedContainer').empty();
        const catText = $('#catSearch').val();
        $.ajax({
            url: `https://api.thecatapi.com/v1/breeds/search?q=${catText}`,
            success: function (data){
                console.log(data)
                for (let x = 0; x < data.length; x++){
                    $.ajax({
                        url: `https://api.thecatapi.com/v1/images/search?breed_id=${data[x].id}`,
                        success: function (response) {
                            for (let i = 0; i < response.length; i++){
                                        const searchContent = $('<div class="searchContent" style="margin-bottom:30px;">')
                                        const img = $('<img style="width:100%;">')
                                        const ul = $('<ul>')                                     
                                        img.attr('src', response[i].url);
                                        console.log(response[i].url);
                                        console.log(response[i].breeds[0].name);
                                        searchContent.append(img);
                                        ul.append(`
                                        <li><strong>Breed name:</strong> ${response[i].breeds[0].name}<br>
                                        <li><strong>Country of origin:</strong> ${response[i].breeds[0].origin}<br>
                                        <li><strong>Description:</strong> ${response[i].breeds[0].description}<br>
                                        <li><strong>Life span:</strong> ${response[i].breeds[0].life_span}<br>
                                        
                                        <li><strong>Weight:</strong> ${response[i].breeds[0].weight.metric} kg<br>
                                        <li><strong>Characteristics:</strong> ${response[i].breeds[0].temperament}

                                    `)
                                        searchContent.append(ul);
                                        $('#catBreedContainer').append(searchContent);
                            }
                        }
                        
                    })//inner ajax
                }//for
                
            }//outer success
            
        })//outer ajax
        
    })//click function
                
                
    function searchCatBreed(s){
         $.ajax({
            headers: {
                'x-api-key': 'bc240bc1-fb69-4b68-b3ba-4a61d196dcaa'
            },
            url: `https://api.thecatapi.com/v1/breeds/search?q=${s}`,
            success: function (data) {                
                for (var x = 0; x < data.length; x++) {
                    if (data[x].name.charAt(0) === s) {
                        $.ajax({
                            url: `https://api.thecatapi.com/v1/images/search?breed_id=${data[x].id}`,
                            success: function (response) {   
                                for (var i = 0; i < response.length; i++) {
                                        const searchContent = $('<div class="searchContent" style="margin-bottom:30px;">')
                                        const img = $('<img style="width:100%;">')
                                        const ul = $('<ul>')                                     
                                        img.attr('src', response[i].url);
                                        searchContent.append(img);
                                        ul.append(`
                                        <li><strong>Breed name:</strong> ${response[i].breeds[0].name}<br>
                                        <li><strong>Country of origin:</strong> ${response[i].breeds[0].origin}<br>
                                        <li><strong>Description:</strong> ${response[i].breeds[0].description}<br>
                                        <li><strong>Life span:</strong> ${response[i].breeds[0].life_span}<br>
                                        
                                        <li><strong>Weight:</strong> ${response[i].breeds[0].weight.metric} kg<br>
                                        <li><strong>Characteristics:</strong> ${response[i].breeds[0].temperament}

                                    `)
                                        searchContent.append(ul);
                                        $('#catBreedContainer').append(searchContent);
                                    
                                }

                            }
                        })

                    }

                }



            }
        })
    } 
    
      function searchDogBreed(s){
        $.ajax({
            headers: {
                'x-api-key': 'bc240bc1-fb69-4b68-b3ba-4a61d196dcaa'
            },

            url: `https://api.thedogapi.com/v1/breeds/search?q=${s}`,
            success: function (data) {
                
                console.log(data)

                for (var x = 0; x < data.length; x++) {
                    if (data[x].name.charAt(0) === s) {



                        $.ajax({
                            url: `https://api.thedogapi.com/v1/images/search?breed_id=${data[x].id}`,
                            success: function (response) {
                                console.log(response);


                                for (var i = 0; i < response.length; i++) {


                                    if (response[i].length != 0) {

                                        const searchContent = $('<div class="searchContent" style="margin-bottom:30px;">')
                                        const img = $('<img style="width:100%;">')
                                        const ul = $('<ul>')                                     

                                        img.attr('src', response[i].url);
                                        console.log(response[i].url);
                                        console.log(response[i].breeds[0].name);

                                        searchContent.append(img);
                                        ul.append(`
                                        <li><strong>Breed name:</strong> ${response[i].breeds[0].name}<br>
                                        <li><strong>Breed group:</strong> ${response[i].breeds[0].breed_group}<br>
                                        <li><strong>Bred for:</strong> ${response[i].breeds[0].bred_for}<br>
                                        <li><strong>Life span:</strong> ${response[i].breeds[0].life_span}<br>
                                        <li><strong>Height:</strong> ${response[i].breeds[0].height.metric} in<br>
                                        <li><strong>Weight:</strong> ${response[i].breeds[0].weight.metric} kg<br>
                                        <li><strong>Characteristics:</strong> ${response[i].breeds[0].temperament}

                                    `)
                                        searchContent.append(ul);
                                        $('#dogBreedContainer').append(searchContent);
                                    }
                                }

                            }
                        })

                    }

                }



            }
        })
    }                   
                             
                                 

                              
    


                           

                           
                                 
                                    
                                            


                                                

})