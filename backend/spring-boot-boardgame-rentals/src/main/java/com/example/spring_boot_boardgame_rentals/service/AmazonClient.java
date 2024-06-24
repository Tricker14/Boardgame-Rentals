package com.example.spring_boot_boardgame_rentals.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

@Service
public class AmazonClient {
    private AmazonS3 s3client;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointURL;

    @Value("${amazonProperties.bucketName}")
    private String bucketName;

    @Value("${amazonProperties.accessKey}")
    private String accessKey;

    @Value("${amazonProperties.secretKey}")
    private String secretKey;

    @PostConstruct
    private void initializeAmazon(){
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3client = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion("ap-southeast-1")
                .build();
    }

    // aws S3 only receive File type (FileInputStream)
    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convertFile);
        fos.write(file.getBytes());
        fos.close();
        return convertFile;
    }

    private String generateFileName(MultipartFile file){
        return new Date().getTime() + "-" + file.getOriginalFilename().replace(" ", "_");
    }

    // Who has URL path of file can access that file
    private void uploadFileToS3Bucket(String fileName, File file){
        this.s3client.putObject(new PutObjectRequest(this.bucketName, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }

    public String uploadFile(MultipartFile multipartFile){
        String fileURL = "";
        try{
            File file = convertMultipartFileToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            fileURL = this.endpointURL + "/" + this.bucketName + "/" + fileName;
            uploadFileToS3Bucket(fileName, file);
            file.delete();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return fileURL;
    }
}
