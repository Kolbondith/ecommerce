from django.urls import path
from base.views import product_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns = [
    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('top/', views.getTopProducts, name="top-products"),

    path('upload/', views.uploadImage, name="upload-image"),

    path('<str:pk>/reviews/', views.createProductReview, name="product-review"),
    path('<str:pk>', views.getProduct, name="product"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
]