package com.example.spring_boot_boardgame_rentals.controller;

import com.example.spring_boot_boardgame_rentals.service.AmazonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/storage")
public class BucketController {
    private AmazonClient amazonClient;

    @Autowired
    public BucketController(AmazonClient amazonClient){
        this.amazonClient = amazonClient;
    }

    @PostMapping("uploadFile")
    public String uploadFile(@RequestPart(value = "file") MultipartFile file){
        return this.amazonClient.uploadFile(file);
    }
}
