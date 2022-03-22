from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from base.serializers import ProductSerializer   
from base.models import Product, Review

from django.contrib.auth.hashers import make_password


@api_view(['GET'])
def getProducts(request):

    query = request.query_params.get('keyword')
    if query == None:
        query=''

    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage :
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getProduct(request , pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request ):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request ):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='sample name',
        price=0,
        brand='sample brand',
        countInStock=0,
        category='sample category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request , pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request) :
    data = request.data
    product_id = data['product_id']

    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')

    product.save()

    return Response('Image was upload successful')


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request , pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    
    return Response('Product was delete')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 reviews already exit

    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'details': 'You already review this product'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    #2 check rating
    elif data['rating'] == 0:
        content = {'details': 'Please Select Rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    #3 create review
    else :
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()

        product.numReviews = len(reviews)

        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
        
        product.save()

        return Response('Reviews add')