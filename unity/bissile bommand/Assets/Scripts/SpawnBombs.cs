using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnBombs : MonoBehaviour
{
    public float spawnRateSeconds;
    public GameObject bombPrefab;

    private float lastSpawn = 0;


    // Update is called once per frame
    void Update()
    {
        if (Time.time - lastSpawn > spawnRateSeconds)
        {
            SpawnBomb();
            lastSpawn = Time.time;
        }
    }

    private void SpawnBomb()
    {
        Debug.Log("Spawning ship");
        Instantiate(bombPrefab, GetRandomPosition(), Quaternion.Euler(new Vector3(0, 0, 180)));
    }

    private Vector3 GetRandomPosition()
    {
        float r = Random.Range(-5, 5);
        return new Vector3(r, 6, 0);
    }
}
